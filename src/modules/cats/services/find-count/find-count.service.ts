import { Injectable, NotFoundException } from '@nestjs/common';
import { CatsRepository } from '@/modules/cats/repositories/cats.repository';

@Injectable()
export class FindCountService {
  constructor(private readonly catsRepo: CatsRepository) {}
  public async findCount(): Promise<number> {
    const catsNumbers = await this.catsRepo.findCount();

    if (!catsNumbers) {
      throw new NotFoundException('No record found.');
    }

    return catsNumbers;
  }
}
