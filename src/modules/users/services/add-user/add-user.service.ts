import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserRepository } from '@/modules/users/repositories/add-user/add-user.repository';
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';

@Injectable()
export class AddUserService {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly loadEmailAlreadyExistsService: LoadEmailAlreadyExistsService,
  ) {}

  async add(data: AddUserDto): Promise<User> {
    await this.loadEmailAlreadyExistsService.loadEmailAlreadyExists(data.email);

    return await this.addUserRepository.addUser(data);
  }
}
