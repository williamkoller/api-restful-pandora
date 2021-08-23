import { Role } from '@/infra/db/entities/role/role.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AddRoleService } from '@/modules/roles/services/add-role/add-role.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions } from '@/modules/users/decorators/permissions.decorator';
import { UserPermissions } from '@/modules/users/enum/user-permissions.enum';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import { Request } from 'express';
import { UpdateRoleService } from '@/modules/roles/services/update-role/update-role.service';
import {
  AddRoleDto,
  UpdateRoleDto,
  FilterRoleDto,
  RoleInputIdDto,
} from '@/modules/roles/dtos';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { LoadAllRolesService } from '@/modules/roles/services/load-all-roles/load-all-roles.service';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { LoadRoleByIdService } from '@/modules/roles/services/load-role-by-id/load-role-by-id.service';
import { DeleteRoleService } from '@/modules/roles/services/delete-role/delete-role.service';
import { ReturnMessageType } from '@/utils/types/return-message/return-message.type';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly addRoleService: AddRoleService,
    private readonly loadUserByRoleService: LoadUserByRoleService,
    private readonly updateRoleService: UpdateRoleService,
    private readonly loadAllRolesService: LoadAllRolesService,
    private readonly loadRoleByIdService: LoadRoleByIdService,
    private readonly deleteRoleService: DeleteRoleService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN, UserPermissions.GENERAL)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all roles.',
  })
  public async loadAll(
    @Query(ValidationPipe) filterRoleDto: FilterRoleDto,
  ): Promise<ResultWithPagination<Role[]>> {
    return await this.loadAllRolesService.loadAll(filterRoleDto);
  }

  @Get('load-role-by-id/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiBody({ type: RoleInputIdDto })
  public async loadById(
    @Param(ValidationParamsPipe) roleInputIdDto: RoleInputIdDto,
  ): Promise<Role> {
    return await this.loadRoleByIdService.loadById(roleInputIdDto.id);
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
    return await this.loadUserByRoleService.loadUserByRole(request.users.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update role with successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Role not found.',
  })
  public async updateRole(
    @Param(ValidationParamsPipe) roleInputIdDto: RoleInputIdDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return await this.updateRoleService.updateRole(
      roleInputIdDto.id,
      updateRoleDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete role with successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Role not found.',
  })
  public async deleteRole(
    @Param(ValidationParamsPipe) roleInputIdDto: RoleInputIdDto,
  ): Promise<ReturnMessageType> {
    return await this.deleteRoleService.deleteRole(roleInputIdDto.id);
  }
}
