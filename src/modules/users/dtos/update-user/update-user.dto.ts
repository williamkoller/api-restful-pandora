import { PartialType } from '@nestjs/swagger';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

export class UpdateUserDto extends PartialType(AddUserDto) {}
