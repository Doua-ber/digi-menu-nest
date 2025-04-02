import { Detail } from "../../detail/entities/detail.entity";
import { Ingredient } from "../../ingredient/entities/ingredient.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { Rubrique } from "../../rubrique/entities/rubrique.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("produits")
export class Produit {
    @PrimaryGeneratedColumn()
      id: number;
    @Column()
      nomEng: string;
    @Column()
      nomAr: string;
    @Column()
      descEng: string;
    @Column()
      descAr: string;
    @Column("float")
        prix: number;  
    @Column()
        image: string;
    @Column()
        stock: number;
    @Column()
        disponibilite: boolean;
    @ManyToOne(() => Rubrique, rubrique => rubrique.produits, { onDelete: "CASCADE" })
        rubrique: Rubrique;
    @ManyToOne(() => Restaurant, restaurant => restaurant.produits, { onDelete: "CASCADE" })
        restaurant: Restaurant;
    @ManyToMany(() => Ingredient, ingredient => ingredient.produits)
    @JoinTable({
            name: "produit_ingredient", // Nom de la table de jointure
            joinColumn: { name: "produitId", referencedColumnName: "id" },
            inverseJoinColumn: { name: "ingredientId", referencedColumnName: "id" }
        })
    ingredients: Ingredient[];

    @OneToMany(() => Detail, detail => detail.produit)
    details: Detail[];

}


