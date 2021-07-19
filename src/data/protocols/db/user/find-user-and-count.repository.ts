import { User } from '@/infra/db/entities/user/user-entity';

export interface FindUserAndCountRepository {
  findUserAndCount: (
    offset: number,
    limit: number,
  ) => Promise<[User[], number]>;
}
