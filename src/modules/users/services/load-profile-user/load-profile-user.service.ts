import { Injectable } from '@nestjs/common';
import { LoadUserByIdRepository } from '@/modules/users/repositories/load-user-by-id/load-user-by-id.repository';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';

@Injectable()
export class LoadProfileUserService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadProfileUser(id: string): Promise<UserReturnType> {
    const user = await this.loadUserByIdRepository.loadUserById(id);

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
