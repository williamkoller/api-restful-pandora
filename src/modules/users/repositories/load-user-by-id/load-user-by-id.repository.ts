import { User } from '@/infra/typeorm/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class LoadUserByIdRepository extends Repository<User> {
  async loadUserById(id: string): Promise<User> {
    return await this.findOne(id);
  }
}
