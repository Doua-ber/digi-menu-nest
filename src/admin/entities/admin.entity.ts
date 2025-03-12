import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { User } from "../../user/entities/user.entity";
import { Entity, Column, ManyToMany, JoinTable, ChildEntity } from "typeorm";

@ChildEntity() 
export class Admin extends User {
  @Column({ default: true })
  isAdmin: boolean;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.admins)
  @JoinTable({
    name: 'admins_restaurants',
    joinColumn: {
      name: 'admin_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'restaurant_id',
      referencedColumnName: 'id',
    },
  })
  restaurants: Restaurant[];
}
