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
import { LoadEmailAlreadyExistsService } from '@/modules/users/services/load-email-already-exists/load-email-already-exists.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByIdRepository } from '@/modules/users/repositories/load-user-by-id/load-user-by-id.repository';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { LoadProfileUserService } from '@/modules/users/services/load-profile-user/load-profile-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LoadUserByEmailRepository,
      LoadUserByIdRepository,
    ]),
  ],
  providers: [
    Hasher,
    AddUserRepository,
    LoadAllUsersRepository,
    AddUserService,
    CalculateOffsetService,
    LoadPaginateObjectService,
    LoadEmailAlreadyExistsService,
    LoadAllUsersService,
    LoadUserByEmailService,
    LoadUserByIdService,
    LoadProfileUserService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
