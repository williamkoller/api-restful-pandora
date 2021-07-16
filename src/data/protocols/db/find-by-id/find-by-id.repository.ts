import { User } from '@/infra/typeorm/entities/user/user-entity';

export interface FindByIdRepository {
  findById: (id: string) => Promise<User>;
}
