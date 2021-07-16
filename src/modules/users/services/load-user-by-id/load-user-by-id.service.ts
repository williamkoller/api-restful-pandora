import { Injectable, NotFoundException } from '@nestjs/common';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly userRepo: UserRepository) {}

  async loadUserById(id: string): Promise<UserReturnType> {
    const user = await this.userRepo.getById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const userReturntype: UserReturnType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userReturntype;
  }
}
