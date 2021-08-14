import { Role } from '@/infra/db/entities/role/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadRoleByIdService } from '@/modules/roles/services/load-role-by-id/load-role-by-id.service';
import { LoadRoleByNameService } from '@/modules/roles/services/load-role-by-name/load-role.by-name.service';
import { AddRoleService } from '@/modules/roles/services/add-role/add-role.service';
import { RolesController } from '@/modules/roles/controllers/roles.controller';
import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UpdateRoleService } from '@/modules/roles/services/update-role/update-role.service';
import { LoadAllRolesService } from '@/modules/roles/services/load-all-roles/load-all-roles.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleRepository, UserRepository]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('DEFAULT_STRATEGY'),
        property: configService.get('PROPERTY_USERS'),
        session: configService.get('SESSION'),
      }),
    }),
  ],
  providers: [
    LoadRoleByIdService,
    LoadRoleByNameService,
    AddRoleService,
    LoadUserByRoleService,
    LoadUserByIdService,
    UpdateRoleService,
    LoadAllRolesService,
    CalculateOffsetService,
    BuildPaginationObjectService,
  ],
  controllers: [RolesController],
})
export class RolesModule {}
