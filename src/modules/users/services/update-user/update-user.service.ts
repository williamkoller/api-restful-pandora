import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { HashComparer } from '@/infra/cryptography/hasher-comparer/hasher-comparer';
import { LoadUserByIdService } from '../load-user-by-id/load-user-by-id.service';
import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user/user-entity';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly hasher: Hasher,
    private readonly userRepo: UserRepository,
    private readonly hashComparer: HashComparer,
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

    const hashPassword = await this.hasher.hash(updateUserDto.password);

    const comparePassword = await this.hashComparer.comparer(
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
