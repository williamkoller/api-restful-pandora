import { User } from '@/infra/db/entities/user/user-entity';
import { Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class AddUserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly loadEmailAlreadyExistsService: LoadEmailAlreadyExistsService,
  ) {}

  async add(data: AddUserDto): Promise<User> {
    await this.loadEmailAlreadyExistsService.loadEmailAlreadyExists(data.email);

    return await this.userRepo.add(data);
  }
}
