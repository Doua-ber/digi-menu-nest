import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Categorie {

    @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      nomEng: string;
      @Column()
      nomAr: string;
      @OneToMany(() => Restaurant, restaurant => restaurant.categorie)
    restaurants: Restaurant[];
}




