import { Detail } from "../../detail/entities/detail.entity";
import { Client } from "../../client/entities/client.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatutCommande } from "../../common/enums/statutCommande.enum";

@Entity('commandes')
export class Commande {

    @PrimaryGeneratedColumn()
      id: number;
    
      
      @Column("float")
    totalPrix: number;
    
    @Column({
      type: 'enum',
      enum: StatutCommande,
      default: StatutCommande.EN_ATTENTE,
    })
    statut: StatutCommande;
    
    
      @Column()
      livraison: boolean; // true: sur place - false: à livré
    
      @CreateDateColumn({ type: "timestamp" })
        createdAt: Date;

//un client est supprimé, toutes ses commandes seront supprimées (onDelete CASCADE).
        @ManyToOne(() => Client, client => client.commandes, { onDelete: "CASCADE" })
    client: Client;
//Si un restaurant est supprimé-> les commandes restent mais restaurantId=NULL(onDelete: "SET NULL" ).
    @ManyToOne(() => Restaurant, restaurant => restaurant.commandes, { onDelete: "SET NULL" })
    restaurant: Restaurant;
    
    @ManyToMany(() => Manager, manager => manager.commandes, { cascade: true })
@JoinTable()
managers: Manager[];

    
    @OneToMany(() => Detail, detail => detail.commande, { cascade: true })
    details: Detail[];
      
}


