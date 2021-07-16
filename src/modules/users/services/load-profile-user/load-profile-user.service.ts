import { Injectable } from '@nestjs/common';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { UserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class LoadProfileUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async loadProfileUser(id: string): Promise<UserReturnType> {
    const user = await this.userRepo.getById(id);

    const userProfile: UserReturnType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userProfile;
  }
}
