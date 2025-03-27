import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleEng: string;
  @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
  @JoinTable({name: 'roles_permissions'})
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
  
  
} 
