import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  readonly totalCount: number;

  @IsNotEmpty()
  readonly page: number;

  @IsNotEmpty()
  readonly offSet: number;

  @IsNotEmpty()
  readonly limit: number;
}
