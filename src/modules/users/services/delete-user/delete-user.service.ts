import { ReturnMessageType } from '@/utils/types/return-message/return-message.type';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<ReturnMessageUserDeleteType>}
   * @memberof DeleteUserService
   */
  public async deleteUser(id: string): Promise<ReturnMessageType> {
    await this.loadUserByIdService.loadUserById(id);
    return await this.userRepo.deleteUser(id);
  }
}
