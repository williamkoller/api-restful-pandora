import { ReturnMessageType } from '@/utils/types/return-message/return-message.type';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadRoleByIdService } from '@/modules/roles/services/load-role-by-id/load-role-by-id.service';

@Injectable()
export class DeleteRoleService {
  constructor(
    private readonly loadRoleByIdService: LoadRoleByIdService,
    private readonly roleRepo: RoleRepository,
  ) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<ReturnMessageType>}
   * @memberof DeleteRoleService
   */
  public async deleteRole(id: string): Promise<ReturnMessageType> {
    const { id: userId } = await this.loadRoleByIdService.loadById(id);
    return await this.roleRepo.deleteRole(userId);
  }
}
