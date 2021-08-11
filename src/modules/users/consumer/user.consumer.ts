import {
  InjectQueue,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { UserJobType } from '@/modules/users/types/user-job/user-job.type';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/infra/db/entities/user/user-entity';
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';

@Processor('users')
export class UserConsumer {
  private logger = new Logger(UserConsumer.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepo: UserRepository,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly loadEmailAlreadyExistsService: LoadEmailAlreadyExistsService,
    @InjectQueue('users') private readonly usersQueue: Queue,
  ) {}

  @Process('process_user')
  async processUser(job: Job<UserJobType>): Promise<void> {
    const { name, surname, email, password } = job.data;

    await this.loadEmailAlreadyExistsService.loadEmailAlreadyExists(email);

    const newUser = this.userRepo.create({
      name,
      surname,
      email,
      password: await this.bcryptAdapter.hash(password),
    });
    await this.userRepo.save(newUser);
  }

  @OnQueueCompleted()
  async onComplete(job: Job<UserJobType>) {
    this.logger.log(`onComplete: ${JSON.stringify(job.data)}`);
    const numberOfJobs = await this.usersQueue.count();
    const activeJobs = await this.usersQueue.getActiveCount();

    if (numberOfJobs === 0 && activeJobs === 0) {
      await this.usersQueue.empty();
    }
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<UserJobType>): Promise<void> {
    this.logger.log(
      `Error in processing queue: ${JSON.stringify(job.failedReason)}`,
    );
  }
}
