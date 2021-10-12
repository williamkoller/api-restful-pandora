import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCatDto } from '../../dtos/create-cat/create-cat.dto';
import { CatParamsOutput } from '../../interfaces/cat-output.interface';
import { CatsRepository } from '../../repositories/cats.repository';
import { createCatTransformer } from '../../transformer/cat.transformer';

@Injectable()
export class AddCatService {
  constructor(private readonly catsRepo: CatsRepository) {}

  /**
   * @param {CreateCatDto} createCatDto
   * @return {*}  {Promise<Cat>}
   * @memberof AddCatService
   */
  public async addCat(createCatDto: CreateCatDto): Promise<CatParamsOutput> {
    const catFound = await this.catsRepo.finByName(createCatDto.name);

    if (catFound) {
      throw new ConflictException('There is already a cat with that name.');
    }

    const createdCat = await this.catsRepo.add(createCatDto);

    return createCatTransformer(createdCat);
  }
}
