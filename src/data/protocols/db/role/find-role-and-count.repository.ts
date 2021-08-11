import { Role } from '@/infra/db/entities/role/role.entity';

export interface FindRoleAndCountRepository {
  findRoleAndCount: (
    offset: number,
    limit: number,
  ) => Promise<[Role[], number]>;
}
