import { User } from '@/infra/typeorm/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '../dtos/add-user/add-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
