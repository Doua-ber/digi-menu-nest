import { Gouvernorat } from "../../common/enums/gouvernorat.enum";
import { Categorie } from "../../categorie/entities/categorie.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("restaurant_requests")
export class RestaurantRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;
@Column()
prenom: string;

  @Column()
  email: string;

  @Column()
  motDePasse: string;

  @Column()
  nomRestaurant: string;

  @Column({ type: "enum", enum: Gouvernorat })
  gouvernorat: Gouvernorat;

  @Column()
  adresseEng: string;

  @Column()
  adresseAr: string;

  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  validatedAt: Date | null;

  @Column({ default: false })
  isApproved: boolean; // demande est approuvée ou nn

  @Column({ default: false })
  isRejected: boolean;

  

 

  @ManyToOne(() => Manager, (manager) => manager.restaurantRequests)
  @JoinColumn({ name: 'managerId' })
  manager: Manager; // Le manager qui a fait la demande

  //agrégation
  @ManyToOne(() => Categorie, (categorie) => categorie.restaurantRequests)
  @JoinColumn({ name: 'categorieId' })
  categorie: Categorie;


}