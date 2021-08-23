import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCatDto } from '../dtos/create-cat/create-cat.dto';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {
  public async add(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = this.create(createCatDto);
    return await this.save(createdCat);
  }
}
