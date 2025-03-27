import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Produit } from '../../produit/entities/produit.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rubriques")
export class Rubrique {
    @PrimaryGeneratedColumn()
          id: number;
        
          @Column()
          nomEng: string;
          @Column()
          nomAr: string;
          @OneToMany(() => Produit, produit => produit.rubrique)
          produits: Produit[];
          @ManyToOne(() => Restaurant, restaurant => restaurant.rubriques, { onDelete: "CASCADE" })
        restaurant: Restaurant;

}
