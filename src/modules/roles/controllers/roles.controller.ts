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

@Controller('roles')
export class RolesController {
  constructor(private readonly addRoleService: AddRoleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  public async addRole(@Body() addRoleDto: AddRoleDto): Promise<Role> {
    return await this.addRoleService.add(addRoleDto);
  }
}
