import { Ville } from "src/common/enums/ville.enum";
import { Admin } from "../../admin/entities/admin.entity";
import { Categorie } from "../../categorie/entities/categorie.entity";
import { Commande } from "../../commande/entities/commande.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Produit } from "../../produit/entities/produit.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Rubrique } from "src/rubrique/entities/rubrique.entity";
@Entity("restaurants")
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ type: "enum", enum: Ville })
  ville: Ville;

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

  @ManyToOne(() => Categorie, (categorie) => categorie.restaurants, { onDelete: "CASCADE" })
  categorie: Categorie;

  @OneToMany(() => Produit, (produit) => produit.restaurant, { cascade: true })
  produits: Produit[];
  @OneToMany(() => Rubrique, rubrique => rubrique.restaurant)
rubriques: Rubrique[];

}