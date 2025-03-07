import { Produit } from "src/produit/entities/produit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rubriques")
export class Rubrique {
    @PrimaryGeneratedColumn()
          id: number;
        
          @Column()
          nomEng: string;
          @Column()
          nomAr: string;
          @OneToMany(() => Produit, produit => produit.rubriques)
          produits: Produit[];
}
