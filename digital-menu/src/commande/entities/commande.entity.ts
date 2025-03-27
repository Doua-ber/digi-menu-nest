import { Client } from "../../client/entities/client.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Detail } from "./detail.entity";

@Entity('commandes')
export class Commande {

    @PrimaryGeneratedColumn()
      id: number;
    
      
      @Column("float")
    totalPrix: number;
    
      @Column()
      statut: string;
    
      @Column()
      isDelivered: boolean;
    
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
    
    @OneToMany(() => Detail, detail => detail.commande, { cascade: true })
    details: Detail[];
      
}
