import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';
import { LoadAllUsersRepository } from '@/modules/users/repositories/load-all-users/load-all-users.repository';

@Injectable()
export class LoadAllUsersService {
  constructor(
    private readonly loadAllUsersRepository: LoadAllUsersRepository,
  ) {}

  async loadAllUsers(
    filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    const users: ResultWithPagination<User[]> =
      await this.loadAllUsersRepository.loadAllUsers(filterUserDto);

    if (users.result?.length === 0) {
      throw new NotFoundException('No record found.');
    }

    users.result.map((user) => delete user.password);

    return users;
  }
}
