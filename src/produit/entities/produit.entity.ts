import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { Rubrique } from "../../rubrique/entities/rubrique.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("produits")
export class Produit {
@PrimaryGeneratedColumn()
      id: number;
      @Column()
      nomEng: string;
      @Column()
      nomAr: string;
      
        @Column("float")
        prix: number;
      
        @Column()
        image: string;
        @Column()
        stock: number;
        @Column()
        disponibilite: boolean;
        @ManyToOne(() => Rubrique, rubrique => rubrique.produits, { onDelete: "CASCADE" })
        rubriques: Rubrique;
        @ManyToOne(() => Restaurant, restaurant => restaurant.produits, { onDelete: "CASCADE" })
restaurant: Restaurant;
}
