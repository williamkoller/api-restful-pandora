import { User } from '@/infra/db/entities/user/user-entity';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

export interface AddUserRepository {
  add: (addUserDto: AddUserDto) => Promise<User>;
}
