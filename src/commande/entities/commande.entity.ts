import { Client } from "src/client/entities/client.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('commandes')
export class Commande {

    @PrimaryGeneratedColumn()
      id: number;
    
      
      @Column("float")
    totalPrix: number;
    
      @Column()
      statut: string;
    
      @Column()
      livraison: boolean;
    
      @CreateDateColumn({ type: "timestamp" })
        createdAt: Date;

//un client est supprimé, toutes ses commandes seront supprimées (onDelete CASCADE).
        @ManyToOne(() => Client, client => client.commandes, { onDelete: "CASCADE" })
    client: Client;
//Si un restaurant est supprimé, les commandes restent mais leur champ restaurantId devient NULL(onDelete: "SET NULL" ).
    @ManyToOne(() => Restaurant, restaurant => restaurant.commandes, { onDelete: "SET NULL" })
    restaurant: Restaurant;
    @ManyToOne(() => Manager, manager => manager.commandes)
    managers: Manager[];
      
}
