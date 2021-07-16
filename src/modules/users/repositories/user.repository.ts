import { AddUserRepository } from '@/data/protocols/db/user/add-user.repository';
import { User } from '@/infra/db/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { GetByEmailRepository } from '@/data/protocols/db/user/get-by-email.repository';
import { GetByIdRepository } from '@/data/protocols/db/user/get-by-id.repository';
import { GetAndCountRepository } from '@/data/protocols/db/user/get-and-count.repository';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements
    AddUserRepository,
    GetByEmailRepository,
    GetByIdRepository,
    GetAndCountRepository
{
  async add(addUserDto: AddUserDto): Promise<User> {
    const newUser = this.create(addUserDto);
    return await this.save(newUser);
  }

  async getById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = (:email)', { email })
      .getOne();
  }

  async getAndCount(offset: number, limit: number): Promise<[User[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
