import { Role } from '@/infra/db/entities/role/role.entity';
import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from '@/modules/roles/dtos';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadRoleByIdService } from '@/modules/roles/services/load-role-by-id/load-role-by-id.service';

@Injectable()
export class UpdateRoleService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly loadRoleByIdService: LoadRoleByIdService,
  ) {}

  /**
   * @param {string} id
   * @param {UpdateRoleDto} updateRoleDto
   * @return {*}  {Promise<Role>}
   * @memberof UpdateRoleService
   */
  public async updateRole(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const role = await this.loadRoleByIdService.loadById(id);
    return await this.roleRepo.updateRole(role, updateRoleDto);
  }
}
