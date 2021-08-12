import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';

@Injectable()
export class LoadUserByRoleService {
  constructor(
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly roleRepo: RoleRepository,
  ) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<string[]>}
   * @memberof LoadUserByRoleService
   */
  public async findUserByRole(id: string): Promise<string[]> {
    const user = await this.loadUserByIdService.loadUserById(id);
    return await this.roleRepo.findRolePermissions(user.id);
  }
}
