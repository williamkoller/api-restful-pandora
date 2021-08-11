import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';
import { BeforeInsert, Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { Role } from '@/infra/db/entities/role/role.entity';

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
    type: 'timestamptz',
    nullable: true,
  })
  lastLogged?: Date;

  @OneToMany(() => Role, (role) => role.user, { eager: true })
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
