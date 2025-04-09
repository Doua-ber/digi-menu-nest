import { Role } from '../../role/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } }) 
export class User {
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

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  
  
}