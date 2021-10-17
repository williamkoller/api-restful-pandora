import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCatDto } from '@/modules/cats/dtos/create-cat/create-cat.dto';
import { AddCatRepository, FindByIdRepository } from '@/data/protocols/db/cat';

@EntityRepository(Cat)
export class CatsRepository
  extends Repository<Cat>
  implements AddCatRepository, FindByIdRepository
{
  public async add(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = Object.assign({} as Cat, createCatDto);
    return await this.save(createdCat);
  }

  public async findById(id: string): Promise<Cat> {
    return await this.findOne({ where: { id } });
  }

  public async finByName(name: string): Promise<Cat> {
    return await this.createQueryBuilder('cats')
      .where('(cats.name ILIKE :name)', { name: `%${name}%` })
      .getOne();
  }

  public async findCatAndCount(
    offset: number,
    limit: number,
  ): Promise<[Cat[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }

  public async findCount(): Promise<number> {
    return await this.count();
  }
}
