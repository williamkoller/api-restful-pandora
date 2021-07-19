import { User } from '@/infra/db/entities/user/user-entity';
import { Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class AddUserService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly userRepo: UserRepository,
    private readonly loadEmailAlreadyExistsService: LoadEmailAlreadyExistsService,
  ) {}

  /**
   * @param {AddUserDto} data
   * @return {*}  {Promise<User>}
   * @memberof AddUserService
   */
  async add(addUserDto: AddUserDto): Promise<User> {
    await this.loadEmailAlreadyExistsService.loadEmailAlreadyExists(
      addUserDto.email,
    );

    const addNewUser = {
      ...addUserDto,
      password: await this.bcryptAdapter.hash(addUserDto.password),
    };

    return await this.userRepo.add(addNewUser);
  }
}
