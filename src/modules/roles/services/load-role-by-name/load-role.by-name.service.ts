import { Role } from '@/infra/db/entities/role/role.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';

@Injectable()
export class LoadRoleByNameService {
  constructor(private readonly roleRepo: RoleRepository) {}

  /**
   * @param {string} name
   * @return {*}  {Promise<Role[]>}
   * @memberof LoadRoleByNameService
   */
  public async findByName(name: string): Promise<Role> {
    const roles = await this.roleRepo.findByName(name);

    if (roles) {
      throw new ConflictException(`Role ${name} already in use.`);
    }

    return roles;
  }
}
