import { IsBoolean, IsString } from "class-validator";
import { Produit } from "../../produit/entities/produit.entity";
import { ManyToMany, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity("ingredients")
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    nomEng: string;

    @Column()
    @IsString()
    nomAr: string;    

    @Column()
    @IsBoolean()
    disponibilite: boolean;

    @ManyToMany(() => Produit, produit => produit.ingredients)
    produits: Produit[];
}
