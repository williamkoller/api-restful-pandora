import { Role } from '@/infra/db/entities/role/role.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';

@Injectable()
export class LoadRoleByNameService {
  constructor(private readonly roleRepo: RoleRepository) {}

  /**
   * @param {string} name
   * @return {*}  {Promise<Role[]>}
   * @memberof LoadRoleByNameService
   */
  public async findByName(name: string): Promise<Role[]> {
    const roles = await this.roleRepo.findByName(name);

    if (roles.length) {
      const roleName = roles.map((role: Role) => role.name === name);
      throw new ConflictException(`Role ${roleName} already in use.`);
    }

    return roles;
  }
}
