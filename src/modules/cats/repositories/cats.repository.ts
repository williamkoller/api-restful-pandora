import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCatDto } from '../dtos/create-cat/create-cat.dto';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {
  /**
   * @param {CreateCatDto} createCatDto
   * @return {*}  {Promise<Cat>}
   * @memberof CatsRepository
   */
  public async add(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = this.create(createCatDto);
    return await this.save(createdCat);
  }

  /**
   * @param {string} id
   * @return {*}  {Promise<Cat>}
   * @memberof CatsRepository
   */
  public async findById(id: string): Promise<Cat> {
    return await this.findOne({ where: { id } });
  }

  /**
   * @param {string} name
   * @return {*}  {Promise<Cat>}
   * @memberof CatsRepository
   */
  public async finByName(name: string): Promise<Cat> {
    return await this.createQueryBuilder('cats')
      .where('(cats.name ILIKE :name)', { name: `%${name}%` })
      .getOne();
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @return {*}  {Promise<[Cat[], number]>}
   * @memberof CatsRepository
   */
  public async findCatAndCount(
    offset: number,
    limit: number,
  ): Promise<[Cat[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
