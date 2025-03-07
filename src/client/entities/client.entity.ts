import { Commande } from "src/commande/entities/commande.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {

@PrimaryGeneratedColumn()
  id: number;
  @Column()
    nom: string;
  
    @Column()
    email: string;
  
    @Column()
    motDePasse: string;
  
    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

      @OneToMany(() => Commande, commande => commande.client)
    commandes: Commande[];
  
}
