import { User } from '@/infra/db/entities/user/user-entity';

export interface GetByEmailRepository {
  getByEmail: (email: string) => Promise<User>;
}
