import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoadUserByIdRepository } from '@/modules/users/repositories/load-user-by-id/load-user-by-id.repository';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';

@Injectable()
export class LoadUserByIdService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadUserById(id: string): Promise<UserReturnType> {
    try {
      const user = await this.loadUserByIdRepository.loadUserById(id);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const userReturntype: UserReturnType = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return userReturntype;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
