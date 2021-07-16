import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { Injectable } from '@nestjs/common';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';

@Injectable()
export class LoadAllUsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly buildPaginationObjectService: BuildPaginationObjectService,
  ) {}

  async findAllUsers(
    filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<Array<User>>> {
    const page = filterUserDto.page ?? 1;
    const limit = filterUserDto.limit ?? 10;

    const offset = this.calculateOffsetService.calculateOffset(page, limit);

    const [users, totalCount] = await this.userRepo.findAllUsers(offset, limit);

    users.map((user: User) => delete user.password);

    const pagination: Pagination =
      this.buildPaginationObjectService.buildPaginationObject({
        limit,
        offset,
        page,
        totalCount,
      });

    return {
      paged: pagination,
      result: users,
    };
  }
}
