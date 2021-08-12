import { Role } from '@/infra/db/entities/role/role.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddRoleDto } from '@/modules/roles/dtos';
import { AddRoleService } from '@/modules/roles/services/add-role/add-role.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions } from '@/modules/users/decorators/permissions.decorator';
import { UserPermissions } from '@/modules/users/enum/user-permissions.enum';
import { PermissionsGuard } from '@/modules/users/guards/permissions.guard';
import { LoadUserByRoleService } from '../services/load-user-by-role/load-user-by-role.service';
import { Request } from 'express';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly addRoleService: AddRoleService,
    private readonly loadUserByRoleService: LoadUserByRoleService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'x-role',
  })
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

  @Get('load-user-by-role')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by role',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async loadUserByRole(@Req() request: Request): Promise<string[]> {
    try {
      return await this.loadUserByRoleService.findUserByRole(request.users.id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
