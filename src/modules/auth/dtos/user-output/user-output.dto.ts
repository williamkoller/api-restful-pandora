import { User } from '@/infra/typeorm/entities/user/user-entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
