import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { User } from '@/infra/db/entities/user/user-entity';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof LoadUserByIdService
   */
  public async loadUserById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user?.id) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
