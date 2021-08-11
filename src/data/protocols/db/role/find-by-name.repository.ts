import { Role } from '@/infra/db/entities/role/role.entity';

export interface FindByNameRepository {
  findByName: (name: string) => Promise<Role[]>;
}
