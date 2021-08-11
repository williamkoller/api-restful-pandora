import { Role } from '@/infra/db/entities/role/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadRoleByIdService } from '@/modules/roles/services/load-role-by-id/load-role-by-id.service';
import { LoadRoleByNameService } from '@/modules/roles/services/load-role-by-name/load-role.by-name.service';
import { AddRoleService } from '@/modules/roles/services/add-role/add-role.service';
import { RolesController } from '@/modules/roles/controllers/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleRepository])],
  providers: [LoadRoleByIdService, LoadRoleByNameService, AddRoleService],
  controllers: [RolesController],
})
export class RolesModule {}
