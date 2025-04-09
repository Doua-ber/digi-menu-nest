import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

//


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
  
  @ManyToOne(
    () => require("../../manager/entities/manager.entity").Manager,
    (manager: any) => manager.rolesGeres,
    { nullable: true, onDelete: 'SET NULL' }
  )
  gerant: import("../../manager/entities/manager.entity").Manager;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.roles)
    restaurant: Restaurant;

}