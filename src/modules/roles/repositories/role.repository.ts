import {
  AddRoleRepository,
  FindByIdRepository,
  FindByNameRepository,
  FindRoleAndCountRepository,
  UpdateRoleRepository,
} from '@/data/protocols/db/role';
import { Role } from '@/infra/db/entities/role/role.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddRoleDto, UpdateRoleDto } from '@/modules/roles/dtos';

@EntityRepository(Role)
export class RoleRepository
  extends Repository<Role>
  implements
    AddRoleRepository,
    FindByIdRepository,
    FindByNameRepository,
    FindRoleAndCountRepository,
    UpdateRoleRepository
{
  /**
   * @param {AddRoleDto} addRoleDto
   * @return {*}  {Promise<Role>}
   * @memberof RoleRepository
   */
  public async add(addRoleDto: AddRoleDto): Promise<Role> {
    const newRole = this.create(addRoleDto);
    return await this.save(newRole);
  }

  /**
   * @param {string} id
   * @return {*}  {Promise<Role>}
   * @memberof RoleRepository
   */
  public async findById(id: string): Promise<Role> {
    return await this.findOne({ where: { id } });
  }

  /**
   * @param {string} name
   * @return {*}  {Promise<Role[]>}
   * @memberof RoleRepository
   */
  public async findByName(name: string): Promise<Role[]> {
    return await this.createQueryBuilder('roles')
      .where('(roles.name ILIKE :name)', { name: `%${name}%` })
      .getMany();
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @return {*}  {Promise<[Role[], number]>}
   * @memberof RoleRepository
   */
  public async findRoleAndCount(
    offset: number,
    limit: number,
  ): Promise<[Role[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }

  /**
   * @param {Role} role
   * @param {UpdateRoleDto} updateRoleDto
   * @return {*}  {Promise<Role>}
   * @memberof RoleRepository
   */
  public async updateRole(
    role: Role,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const roleUpdated = this.merge(role, { ...updateRoleDto });
    return await this.save(roleUpdated);
  }
}
