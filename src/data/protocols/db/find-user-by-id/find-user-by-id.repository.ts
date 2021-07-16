import { User } from '@/infra/typeorm/entities/user/user-entity';

export interface FindUserByIdRepository {
  findUserById: (id: string) => Promise<User>;
}
