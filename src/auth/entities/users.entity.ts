import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: 1,
  })
  active: boolean;

  @ApiProperty()
  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
  })
  roles: Role[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;
}
