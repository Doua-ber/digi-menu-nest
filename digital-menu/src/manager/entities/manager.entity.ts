import { RestaurantRequest } from "../../restaurant-request/entities/restaurant-request.entity";
import { Commande } from "../../commande/entities/commande.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { User } from "../../user/entities/user.entity";
import { Entity, Column, ManyToMany, JoinTable, OneToMany, ChildEntity, ManyToOne } from "typeorm";

@ChildEntity() 
export class Manager extends User {
  @Column({ default: false })
  isOwner: boolean;

  @ManyToMany(() => Restaurant, restaurant => restaurant.managers)
    restaurants: Restaurant[];

  @OneToMany(() => Commande, commande => commande.managers)
  commandes: Commande[];

  
  @OneToMany(() => RestaurantRequest, (request) => request.manager)
  restaurantRequests: RestaurantRequest[]; // Les demandes faites par ce manager
  
  /*
  //association reflexive
  @ManyToOne(() => Manager, manager => manager.subManagers, { nullable: true, onDelete: "SET NULL" })
  parentManager: Manager;

  @OneToMany(() => Manager, manager => manager.parentManager)
  subManagers: Manager[];
 */
  
}
