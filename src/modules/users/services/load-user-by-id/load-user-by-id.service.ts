import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '@/infra/db/entities/user/user-entity';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof LoadUserByIdService
   */
  async loadUserById(id: string): Promise<User> {
    const user = await this.userRepo.getById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
