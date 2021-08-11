import { Role } from '@/infra/db/entities/role/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleRepository])],
})
export class RolesModule {}
