import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';

export interface ResultWithPagination<T> {
  paged: Pagination;
  result: T | T[];
}
