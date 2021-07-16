import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class LoadEmailAlreadyExistsService {
  constructor(private readonly userRepo: UserRepository) {}

  async loadEmailAlreadyExists(email: string): Promise<User> {
    const userExists = await this.userRepo.findByEmail(email);

    if (userExists) {
      throw new ConflictException('Email already in use.');
    }

    return userExists;
  }
}
