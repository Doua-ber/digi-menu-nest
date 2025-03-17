import { Manager } from "../../manager/entities/manager.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("restaurant_requests")
export class RestaurantRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  motDePasse: string;

  @Column()
  nomRestaurant: string;

  @Column()
  adresseEng: string;

  @Column()
  adresseAr: string;

  @Column({ default: false })
  isApproved: boolean; // demande est approuvée ou nn

 

  @ManyToOne(() => Manager, (manager) => manager.restaurantRequests)
  @JoinColumn({ name: 'managerId' })
  manager: Manager; // Le manager qui a fait la demande
}