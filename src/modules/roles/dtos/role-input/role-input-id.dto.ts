import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoleInputIdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
