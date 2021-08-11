import { Role } from '@/infra/db/entities/role/role.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddRoleDto } from '@/modules/roles/dtos';
import { AddRoleService } from '@/modules/roles/services/add-role/add-role.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '@/modules/users/decorators/permissions.decorator';
import { UserPermissions } from '@/modules/users/enum/user-permissions.enum';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly addRoleService: AddRoleService) {}

  @UseGuards(JwtAuthGuard)
  @Permissions(UserPermissions.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new role.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Role name already in use.',
  })
  public async addRole(@Body() addRoleDto: AddRoleDto): Promise<Role> {
    return await this.addRoleService.add(addRoleDto);
  }
}
