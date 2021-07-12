import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoadUserByIdRepository } from '@/modules/users/repositories/load-user-by-id/load-user-by-id.repository';
import { User } from '@/infra/typeorm/entities/user/user-entity';

@Injectable()
export class LoadUserByIdService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadUserById(id: string): Promise<User> {
    try {
      const userExists = await this.loadUserByIdRepository.loadUserById(id);

      if (!userExists) {
        throw new NotFoundException('User not found.');
      }

      return userExists;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
