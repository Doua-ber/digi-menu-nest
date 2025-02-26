import { Permission } from 'src/permission/entities/permission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class Role {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleEng: string;
  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({name: 'roles_permissions'})
  permissions: Permission[];
  
} 
