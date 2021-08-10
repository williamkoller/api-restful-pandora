import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  surname: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    name: 'last_logged',
    type: 'timestamptz',
    nullable: true,
  })
  lastLogged?: Date;

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
