import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';

@Injectable()
export class LoadUserByEmailService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async loadUserByEmail(email: string): Promise<User> {
    const userExists = await this.loadUserByEmailRepository.loadUserByEmail(
      email,
    );

    if (!userExists?.email) {
      throw new NotFoundException('User not found.');
    }

    return userExists;
  }
}
