import { Role } from '@/infra/db/entities/role/role.entity';
import { Injectable } from '@nestjs/common';
import { AddRoleDto } from '@/modules/roles/dtos';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadRoleByNameService } from '@/modules/roles/services/load-role-by-name/load-role.by-name.service';

@Injectable()
export class AddRoleService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly loadRoleByNameService: LoadRoleByNameService,
  ) {}

  /**
   * @param {AddRoleDto} addRoleDto
   * @return {*}  {Promise<Role>}
   * @memberof AddRoleService
   */
  public async add(addRoleDto: AddRoleDto): Promise<Role> {
    await this.loadRoleByNameService.loadByName(addRoleDto.name);
    return await this.roleRepo.add(addRoleDto);
  }
}
