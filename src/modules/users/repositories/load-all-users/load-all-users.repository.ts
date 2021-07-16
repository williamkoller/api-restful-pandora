import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';

@Injectable()
export class LoadAllUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly loadAllUsersRepository: Repository<User>,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly buildPaginationObjectService: BuildPaginationObjectService,
  ) {}

  async loadAllUsers(
    filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    const page = filterUserDto.page || 1;
    const limit = filterUserDto.limit || 1;

    const offset = this.calculateOffsetService.calculateOffset(page, limit);

    const [users, totalCount] = await this.loadAllUsersRepository.findAndCount({
      skip: offset,
      take: limit,
    });

    const pagination = this.buildPaginationObjectService.buildPaginationObject({
      limit,
      offset,
      page,
      totalCount,
    });

    users.map((user: User) => delete user.password);

    return {
      paged: pagination,
      result: users,
    };
  }
}
