import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { CreateCatDto } from '@/modules/cats/dtos/create-cat/create-cat.dto';

export interface AddCatRepository {
  add: (createCatDto: CreateCatDto) => Promise<Cat>;
}
