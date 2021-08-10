import { Injectable } from '@nestjs/common';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';

@Injectable()
export class LoadProfileUserService {
  constructor(private readonly loadUserByIdService: LoadUserByIdService) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<UserReturnType>}
   * @memberof LoadProfileUserService
   */
  async loadProfileUser(id: string): Promise<UserReturnType> {
    const user = await this.loadUserByIdService.loadUserById(id);

    const userProfile: UserReturnType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogged: user.lastLogged,
    };

    delete userProfile.password;

    return userProfile;
  }
}
