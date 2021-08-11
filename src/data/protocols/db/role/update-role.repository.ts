import { Role } from '@/infra/db/entities/role/role.entity';
import { UpdateRoleDto } from '@/modules/roles/dtos';

export interface UpdateRoleRepository {
  updateRole: (role: Role, updateRoleDto: UpdateRoleDto) => Promise<Role>;
}
