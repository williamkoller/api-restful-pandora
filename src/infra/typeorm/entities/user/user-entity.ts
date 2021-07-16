import { BaseEntity } from '@/infra/typeorm/entities/base-entity/base-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
