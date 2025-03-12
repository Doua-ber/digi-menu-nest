import { Commande } from "../../commande/entities/commande.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { User } from "../../user/entities/user.entity";
import { Entity, Column, ManyToMany, JoinTable, OneToMany, ChildEntity } from "typeorm";

@ChildEntity() 
export class Manager extends User {
  @Column({ default: true })
  isOwner: boolean;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.managers)
  @JoinTable({
    name: 'managers_restaurants',
    joinColumn: {
      name: 'manager_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'restaurant_id',
      referencedColumnName: 'id',
    },
  })
  restaurants: Restaurant[];

  @OneToMany(() => Commande, commande => commande.managers)
  commandes: Commande[];
}