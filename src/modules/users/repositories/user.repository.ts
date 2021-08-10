import { AddUserRepository } from '@/data/protocols/db/user/add-user.repository';
import { User } from '@/infra/db/entities/user/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { FindByEmailRepository } from '@/data/protocols/db/user/find-by-email.repository';
import { FindByIdRepository } from '@/data/protocols/db/user/find-by-id.repository';
import { FindUserAndCountRepository } from '@/data/protocols/db/user/find-user-and-count.repository';
import { UpdateUserRepository } from '@/data/protocols/db/user/update-user.repository';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';
import { DeleteUserRepository } from '@/data/protocols/db/user/delete-user.repository';
import { ReturnMessageUserDeleteType } from '@/utils/types/return-message-user-delete/return-message-user-delete.type';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements
    AddUserRepository,
    FindByEmailRepository,
    FindByIdRepository,
    FindUserAndCountRepository,
    UpdateUserRepository,
    DeleteUserRepository
{
  /**
   * @param {AddUserDto} addUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  public async add(addUserDto: AddUserDto): Promise<User> {
    const newUser = this.create(addUserDto);
    return await this.save(newUser);
  }

  /**
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  public async findById(id: string): Promise<User> {
    return await this.findOne({ where: { id } });
  }

  /**
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  public async findByEmail(email: string): Promise<User> {
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
  public async findUserAndCount(
    offset: number,
    limit: number,
  ): Promise<[User[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }

  /**
   * @param {User} user
   * @param {UpdateUserDto} updateUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  public async updateUser(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userUpdated = this.merge(user, { ...updateUserDto });
    return await this.save(userUpdated);
  }

  /**
   * @param {string} id
   * @return {*}  {Promise<ReturnMessageUserDeleteType>}
   * @memberof UserRepository
   */
  public async deleteUser(id: string): Promise<ReturnMessageUserDeleteType> {
    await this.delete(id);
    return {
      message: 'User deleted with successfully.',
      deleted: true,
    };
  }

  /**
   * @param {string} id
   * @param {Date} lastLogged
   * @return {*}  {Promise<void>}
   * @memberof UserRepository
   */
  public async lastLogged(id: string, lastLogged: Date): Promise<void> {
    await this.query('UPDATE "users" SET "last_logged" = $2 WHERE id = $1', [
      id,
      lastLogged,
    ]);
  }
}
