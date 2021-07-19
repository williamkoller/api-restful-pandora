import { User } from '@/infra/db/entities/user/user-entity';

export interface FindByIdRepository {
  findById: (id: string) => Promise<User>;
}
