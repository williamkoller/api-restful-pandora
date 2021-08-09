import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { AddUserDto } from '../../dtos/add-user/add-user.dto';

@Injectable()
export class ProcessUserService {
  constructor(@InjectQueue('users') private usersQueue: Queue) {}

  async processUser(addUserDto: AddUserDto): Promise<void> {
    await this.usersQueue.add(
      'process_user',
      { ...addUserDto },
      { delay: 1000 * 60 * 0.2, attempts: 1, stackTraceLimit: 1 },
    );
  }
}
