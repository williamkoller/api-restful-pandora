import { Column } from 'typeorm';
import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';

export class Cat extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  age: Date;
}
