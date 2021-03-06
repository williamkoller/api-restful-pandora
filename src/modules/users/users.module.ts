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
import { ProcessUserService } from '@/modules/users/services/process-users/process-users.service';
import { UserConsumer } from '@/modules/users/consumer/user.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '@/infra/db/entities/role/role.entity';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';
import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRepository, RoleRepository]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('DEFAULT_STRATEGY'),
        property: configService.get('PROPERTY_USERS'),
        session: configService.get('SESSION'),
      }),
    }),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: process.env.REDIS_QUEUE_USERS,
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
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
    ProcessUserService,
    UserConsumer,
    LoadUserByRoleService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
