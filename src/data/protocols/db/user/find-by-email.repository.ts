import { User } from '@/infra/db/entities/user/user-entity';

export interface FindByEmailRepository {
  findByEmail: (email: string) => Promise<User>;
}
