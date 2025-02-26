

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  motDePasse: string;

  
}
