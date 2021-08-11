import { PartialType } from '@nestjs/swagger';
import { AddRoleDto } from '@/modules/roles/dtos/add-role/add-role.dto';

export class UpdateRoleDto extends PartialType(AddRoleDto) {}
