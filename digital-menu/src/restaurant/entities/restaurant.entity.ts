import { Admin } from "../../admin/entities/admin.entity";
import { Categorie } from "../../categorie/entities/categorie.entity";
import { Commande } from "../../commande/entities/commande.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Produit } from "../../produit/entities/produit.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Rubrique } from "../../rubrique/entities/rubrique.entity";
import { Gouvernorat } from "../../common/enums/gouvernorat.enum";
import { Role } from "../../role/entities/role.entity";
@Entity("restaurants")
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ type: "enum", enum: Gouvernorat })
  gouvernorat: Gouvernorat;

  @Column()
  adresseEng: string;

  @Column()
  adresseAr: string;

  @Column()
  qrCode: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Commande, (commande) => commande.restaurant)
  commandes: Commande[];

  @ManyToMany(() => Admin, (admin) => admin.restaurants)
  admins: Admin[];

  @ManyToMany(() => Manager, manager => manager.restaurants)
  @JoinTable({ name: 'restaurants_managers' })
  managers: Manager[];

  //agregation
  @ManyToOne(() => Categorie, (categorie) => categorie.restaurants)
  categorie: Categorie;

  @OneToMany(() => Produit, (produit) => produit.restaurant, { cascade: true })
  produits: Produit[];
  @OneToMany(() => Rubrique, rubrique => rubrique.restaurant)
rubriques: Rubrique[];

@OneToMany(() => Role, (roles) => roles.restaurant)
  roles: Role[];

}