import { RestaurantRequest } from "../../restaurant-request/entities/restaurant-request.entity";
import { Commande } from "../../commande/entities/commande.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { User } from "../../user/entities/user.entity";
import { Entity, Column, ManyToMany, OneToMany, ChildEntity } from "typeorm";
//



@ChildEntity() 
export class Manager extends User {
  @Column({ default: false })
  isOwner: boolean;

  @ManyToMany(() => Restaurant, restaurant => restaurant.managers)
  restaurants: Restaurant[];

    @ManyToMany(() => Commande, commande => commande.managers)
    commandes: Commande[];
    

  
  @OneToMany(() => RestaurantRequest, (request) => request.manager)
  restaurantRequests: RestaurantRequest[]; // Les demandes faites par ce manager

  // Utilisation de require pour éviter l'importation circulaire
  //pour ne pas causé une boucle d’importation circulaire entre Role et Manager
  @OneToMany(
    () => require('../../role/entities/role.entity').Role,
    (role: any) => role.gerant
  )
  rolesGeres: import('../../role/entities/role.entity').Role[];
}