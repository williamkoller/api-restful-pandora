import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class LoadUserByEmailService {
  constructor(private readonly userRepo: UserRepository) {}

  async loadUserByEmail(email: string): Promise<User> {
    const userExists = await this.userRepo.findByEmail(email);

    if (!userExists?.email) {
      throw new NotFoundException('User not found.');
    }

    return userExists;
  }
}
