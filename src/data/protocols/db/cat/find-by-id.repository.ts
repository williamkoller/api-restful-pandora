import { Cat } from '@/infra/db/entities/cat/cat.entity';

export interface FindByIdRepository {
  findById: (id: string) => Promise<Cat>;
}
