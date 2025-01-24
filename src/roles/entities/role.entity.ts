import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permissions } from './permission.entity';
import { User } from 'src/auth/entities/users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ManyToMany(() => Permissions, (permissions) => permissions.roles)
  permisssions: Permissions[];

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
