import { Cat } from '@/infra/db/entities/cat/cat.entity';
import { validatorAge } from '@/utils/validator/validator-age/validator-age';
import { CatParamsOutput } from '@/modules/cats/interfaces/cat-output.interface';
import { validatorDate } from '@/utils/validator/validator-date/validator-date';

export const createCatTransformer = (cat: Cat): CatParamsOutput => {
  return {
    name: cat.name,
    age: `${validatorAge(cat.age)} age`,
    createdAt: validatorDate(cat.createdAt),
    updatedAt: validatorDate(cat.updatedAt),
  };
};
