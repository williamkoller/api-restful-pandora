import { Injectable } from '@nestjs/common';
import { PaginationDto } from '@/shared/pagination/dtos/pagination/pagination.dto';
import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';

@Injectable()
export class LoadPaginateObjectService {
  loadPaginateObject(paginationData: PaginationDto): Pagination {
    const { totalCount, page } = paginationData;

    const offSet = Number(paginationData.offset);
    const limit = Number(paginationData.limit);

    const pageCount = Math.ceil(totalCount / limit);

    const result: Pagination = {
      page: Number(page),
      limit,
      offSet,
      pageCount,
      totalCount,
    };

    return result;
  }
}
