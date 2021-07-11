import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { LoadPaginateObjectService } from '@/shared/pagination/services/load-paginate-object/load-paginate-object.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterUserDto } from '../../dtos/filter-user/filter-user.dto';

@Injectable()
export class LoadAllUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly loadAllUsersRepository: Repository<User>,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly loadPaginateObjectService: LoadPaginateObjectService,
  ) {}

  async loadAllUsers(
    filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    const page = filterUserDto.page | 1;
    const limit = filterUserDto.limit | 1;

    const { search } = filterUserDto;

    const offSet = this.calculateOffsetService.calculateOffset(page, limit);

    const query = this.loadAllUsersRepository.createQueryBuilder('users');

    if (search) {
      query.andWhere('users.name ILIKE :name', { name: `%${search}%` });
    }

    const [report, totalCount] = await query.getManyAndCount();

    const pagination = this.loadPaginateObjectService.loadPaginateObject({
      limit,
      offset: offSet,
      page,
      totalCount,
    });

    return {
      paged: pagination,
      result: report,
    };
  }
}
