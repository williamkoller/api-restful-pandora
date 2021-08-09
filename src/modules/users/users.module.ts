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
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'users',
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('HOSTNAME_REDIS'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
  ],
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
    BcryptAdapter,
    DeleteUserService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
