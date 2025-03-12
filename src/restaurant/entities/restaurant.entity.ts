import { Admin } from "../../admin/entities/admin.entity";
import { Categorie } from "../../categorie/entities/categorie.entity";
import { Commande } from "../../commande/entities/commande.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { Produit } from "../../produit/entities/produit.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("restaurants")
export class Restaurant {

    @PrimaryGeneratedColumn()
      id: number;
      @Column()
        nom: string;
      
        @Column()
        adresseEng: string;
      
        @Column()
        adresseAr: string;
        @Column()
        qrCode: string;
        @Column()
        isActive: boolean;
        @OneToMany(() => Commande, commande => commande.restaurant)
    commandes: Commande[];
    @ManyToMany(() => Admin, (admin) => admin.restaurants)
  admins: Admin[];
  @ManyToMany(() => Manager, (manager) => manager.restaurants)
  managers: Admin[];
  @ManyToOne(() => Categorie, categorie => categorie.restaurants, { onDelete: "CASCADE" })
    categorie: Categorie;
@OneToMany(() => Produit, produit => produit.restaurant, { cascade: true })
produits: Produit[];
}
