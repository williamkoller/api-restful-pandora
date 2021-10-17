import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';

@Entity('cats')
export class Cat extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  age: string;

  constructor(partial: Partial<Cat>) {
    super();
    Object.assign(this, partial);
  }
}
