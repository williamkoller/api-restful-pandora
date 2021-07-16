import { HashComparer } from '@/infra/cryptography/hasher-comparer/hasher-comparer';
import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { AuthService } from '@/modules/auth/services/auth.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LoadProfileUserService } from '@/modules/users/services/load-profile-user/load-profile-user.service';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LoadUserByEmailService,
    LoadUserByIdService,
    HashComparer,
    JwtStrategy,
    PassportModule,
    LoadProfileUserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
