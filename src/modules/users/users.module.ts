import { User } from '@/infra/db/entities/user/user-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { LoadProfileUserService } from '@/modules/users/services/load-profile-user/load-profile-user.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { HashComparer } from '@/infra/cryptography/hasher-comparer/hasher-comparer';
import { Hasher } from '@/infra/cryptography/hasher/hasher';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [
    AddUserService,
    CalculateOffsetService,
    BuildPaginationObjectService,
    LoadEmailAlreadyExistsService,
    LoadAllUsersService,
    LoadUserByEmailService,
    LoadUserByIdService,
    LoadProfileUserService,
    UpdateUserService,
    Hasher,
    HashComparer,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
