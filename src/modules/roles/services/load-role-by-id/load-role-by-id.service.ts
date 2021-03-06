import { Role } from '@/infra/db/entities/role/role.entity';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';

@Injectable()
export class LoadRoleByIdService {
  constructor(private readonly roleRepo: RoleRepository) {}

  /**
   * @param {string} id
   * @return {*}  {Promise<Role>}
   * @memberof LoadRoleByIdService
   */
  public async loadById(id: string): Promise<Role> {
    const role = await this.roleRepo.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    return role;
  }
}
