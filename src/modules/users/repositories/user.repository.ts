import { AddUserRepository } from '@/data/protocols/db/user/add-user.repository';
import { User } from '@/infra/db/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { GetByEmailRepository } from '@/data/protocols/db/user/get-by-email.repository';
import { GetByIdRepository } from '@/data/protocols/db/user/get-by-id.repository';
import { GetAndCountRepository } from '@/data/protocols/db/user/get-and-count.repository';
import { UpdateUserRepository } from '@/data/protocols/db/user/update-user.repository';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements
    AddUserRepository,
    GetByEmailRepository,
    GetByIdRepository,
    GetAndCountRepository,
    UpdateUserRepository
{
  /**
   * @param {AddUserDto} addUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async add(addUserDto: AddUserDto): Promise<User> {
    const newUser = this.create(addUserDto);
    return await this.save(newUser);
  }

  /**
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async getById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  /**
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async getByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = (:email)', { email })
      .getOne();
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @return {*}  {Promise<[User[], number]>}
   * @memberof UserRepository
   */
  async getAndCount(offset: number, limit: number): Promise<[User[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }

  /**
   * @param {User} user
   * @param {UpdateUserDto} updateUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const userUpdated = this.merge(user, { ...updateUserDto });
    return await this.save(userUpdated);
  }
}
