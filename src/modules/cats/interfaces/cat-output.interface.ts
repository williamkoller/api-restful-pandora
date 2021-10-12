export interface CatOutput {
  id: string;
  name: string;
  age: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type CatParamsOutput = Omit<CatOutput, 'id'>;
