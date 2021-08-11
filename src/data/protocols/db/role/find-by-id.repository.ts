import { Role } from '@/infra/db/entities/role/role.entity';

export interface FindByIdRepository {
  findById: (id: string) => Promise<Role>;
}
