import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserInputIdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
