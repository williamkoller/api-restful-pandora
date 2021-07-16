import { User } from '@/infra/db/entities/user/user-entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
