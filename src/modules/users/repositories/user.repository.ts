import { AddUserRepository } from '@/data/protocols/db/add-user/add-user.repository';
import { User } from '@/infra/typeorm/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { FindUserByIdRepository } from '@/data/protocols/db/find-user-by-id/find-user-by-id.repository';
import { FindByIdRepository } from '@/data/protocols/db/find-by-id/find-by-id.repository';
import { FindAllUsersRepository } from '@/data/protocols/db/find-all-users/find-all-users.repository';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements
    AddUserRepository,
    FindUserByIdRepository,
    FindByIdRepository,
    FindAllUsersRepository
{
  findById: (id: string) => Promise<User>;
  async add(addUserDto: AddUserDto): Promise<User> {
    const newUser = this.create(addUserDto);
    return await this.save(newUser);
  }

  async findUserById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = (:email)', { email })
      .getOne();
  }

  async findAllUsers(offset: number, limit: number): Promise<[User[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
