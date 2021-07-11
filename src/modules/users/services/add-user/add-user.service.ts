import { User } from '@/infra/typeorm/entities/user/user-entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserRepository } from '@/modules/users/repositories/add-user/add-user.repository';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';

@Injectable()
export class AddUserService {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailService: LoadUserByEmailService,
  ) {}

  async add(data: AddUserDto): Promise<User> {
    try {
      await this.loadUserByEmailService.loadUserByEmail(data.email);

      return await this.addUserRepository.addUser(data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
