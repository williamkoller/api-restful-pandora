import { User } from '@/infra/db/entities/user/user-entity';

export interface GetAndCountRepository {
  getAndCount: (offset: number, limit: number) => Promise<[User[], number]>;
}
