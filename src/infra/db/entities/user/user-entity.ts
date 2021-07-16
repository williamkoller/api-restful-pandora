import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { genSaltSync, hashSync } from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column('varchar')
  surname: string;

  @ApiProperty()
  @Column('varchar')
  email: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  hashPassword(): void {
    const salt = genSaltSync();
    this.password = hashSync(this.password, salt);
  }

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
