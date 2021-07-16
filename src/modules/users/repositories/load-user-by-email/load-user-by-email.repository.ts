import { User } from '@/infra/typeorm/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class LoadUserByEmailRepository extends Repository<User> {
  async loadUserByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = (:email)', { email })
      .getOne();
  }
}
