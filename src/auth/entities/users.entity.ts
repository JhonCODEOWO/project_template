import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: 1,
  })
  active: boolean;

  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
