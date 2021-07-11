import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterUserDto {
  @ApiProperty()
  @IsOptional()
  readonly page?: number;

  @ApiProperty()
  @IsOptional()
  readonly limit?: number;

  @ApiProperty()
  @IsOptional()
  readonly search?: string;
}
