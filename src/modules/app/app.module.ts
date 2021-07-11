import { configService } from '@/infra/typeorm/config/config.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/modules/users/users.module';
import { CoreModule } from '@/modules/core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    forwardRef(() => UsersModule),
    forwardRef(() => CoreModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
