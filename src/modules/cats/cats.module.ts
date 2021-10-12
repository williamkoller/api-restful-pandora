import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from '@/modules/cats/repositories/cats.repository';
import { AddCatService } from './services/add-cat/add-cat.service';
import { CatsController } from './controllers/cats.controller';
import { LoadUserByRoleService } from '../roles/services/load-user-by-role/load-user-by-role.service';
import { LoadUserByIdService } from '../users/services/load-user-by-id/load-user-by-id.service';
import { RoleRepository } from '../roles/repositories/role.repository';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cat,
      CatsRepository,
      RoleRepository,
      UserRepository,
    ]),
  ],
  providers: [AddCatService, LoadUserByRoleService, LoadUserByIdService],
  controllers: [CatsController],
})
export class CatsModule {}
