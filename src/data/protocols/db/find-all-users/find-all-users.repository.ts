import { User } from '@/infra/typeorm/entities/user/user-entity';

export interface FindAllUsersRepository {
  findAllUsers: (offset: number, limit: number) => Promise<[User[], number]>;
}
