import { Commande } from "../../commande/entities/commande.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {

@PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false }) 
  nom: string;

  @Column({ nullable: false })
prenom: string;

  
  @Column({ nullable: false }) 
    email: string;
  
    @Column({ nullable: false }) 
    motDePasse: string;
  
    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

      @OneToMany(() => Commande, commande => commande.client)
    commandes: Commande[];
  
}
