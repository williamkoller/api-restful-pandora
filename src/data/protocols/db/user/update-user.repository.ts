import { User } from '@/infra/db/entities/user/user-entity';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';

export interface UpdateUserRepository {
  updateUser: (user: User, updateUserDto: UpdateUserDto) => Promise<User>;
}
