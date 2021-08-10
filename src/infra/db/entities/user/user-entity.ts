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

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @Column({ type: 'date', name: 'last_logged', nullable: true })
  lastLogged?: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
