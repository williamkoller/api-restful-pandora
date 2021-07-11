import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadAllUsersRepository } from '@/modules/users/repositories/load-all-users/load-all-users.repository';
import { AddUserRepository } from '@/modules/users/repositories/add-user/add-user.repository';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { LoadPaginateObjectService } from '@/shared/pagination/services/load-paginate-object/load-paginate-object.service';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, LoadUserByEmailRepository])],
  providers: [
    Hasher,
    AddUserRepository,
    LoadAllUsersRepository,
    AddUserService,
    CalculateOffsetService,
    LoadPaginateObjectService,
    LoadUserByEmailService,
    LoadAllUsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
