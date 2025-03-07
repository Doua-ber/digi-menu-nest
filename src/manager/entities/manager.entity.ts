import { Commande } from "src/commande/entities/commande.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity("managers")
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