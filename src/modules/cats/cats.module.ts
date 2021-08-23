import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from '@/modules/cats/repositories/cats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatsRepository])],
})
export class CatsModule {}
