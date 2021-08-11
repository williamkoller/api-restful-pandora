import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { User } from '@/infra/db/entities/user/user-entity';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly userRepo: UserRepository,
    private readonly loadUserByIdService: LoadUserByIdService,
  ) {}

  /**
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @return {*}  {Promise<User>}
   * @memberof UpdateUserService
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.loadUserByIdService.loadUserById(id);

    const hashPassword = await this.bcryptAdapter.hash(updateUserDto.password);

    const comparePassword = await this.bcryptAdapter.compare(
      updateUserDto.password,
      user.password,
    );

    if (comparePassword) {
      throw new ConflictException(
        'The password cannot be identical to the previous one.',
      );
    }

    const newUpdateUser = {
      ...updateUserDto,
      password: hashPassword,
    };

    return await this.userRepo.updateUser(user, newUpdateUser);
  }
}
