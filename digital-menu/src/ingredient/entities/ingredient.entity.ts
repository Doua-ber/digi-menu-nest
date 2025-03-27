import { IsBoolean, IsString } from "class-validator";
import { Produit } from "../../produit/entities/produit.entity";
import { ManyToMany, PrimaryGeneratedColumn,Entity } from "typeorm";

@Entity("ingredients")
export class Ingredient {

    @PrimaryGeneratedColumn()

    id: number;
        


    @IsString()
    nomEng: string;
    
    @IsString()
     nomAr: string;
    
    
    
    
    
    @IsBoolean()
    disponibilite: boolean;
    
    @ManyToMany(() => Produit, produit => produit.ingredients)
    produits: Produit[];
    
    


}



