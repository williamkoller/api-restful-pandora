import { User } from '@/infra/db/entities/user/user-entity';

export interface GetByIdRepository {
  getById: (id: string) => Promise<User>;
}
