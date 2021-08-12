import { configService } from '@/infra/db/config/config.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/modules/users/users.module';
import { CoreModule } from '@/modules/core/core.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from '@/modules/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@/modules/health/controllers/health.controller';
import { RolesModule } from '@/modules/roles/roles.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('DEFAULT_STRATEGY'),
        property: configService.get('PROPERTY_USERS'),
        session: configService.get('SESSION'),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    forwardRef(() => UsersModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MorganModule),
    forwardRef(() => HealthModule),
    forwardRef(() => TerminusModule),
    forwardRef(() => RolesModule),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
