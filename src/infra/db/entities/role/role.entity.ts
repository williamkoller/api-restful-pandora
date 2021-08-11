import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity/base-entity';
import { User } from '@/infra/db/entities/user/user-entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'text', array: true })
  permissions: string[];

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.rolePermissions, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  user: User;

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
