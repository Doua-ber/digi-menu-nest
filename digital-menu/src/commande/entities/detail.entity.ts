import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Commande } from "./commande.entity";
import { Produit } from "../../produit/entities/produit.entity";


@Entity('details')
export class Detail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    quantite: number;

    @Column("float")
    prix: number;

    //Si une commande est supprimée, ses détails sont supprimés.
    @ManyToOne(() => Commande, commande => commande.details, { onDelete: "CASCADE" })
    commande: Commande;

    //Si un produit est supprimé, les détails correspondants sont aussi supprimés.
    @ManyToOne(() => Produit, produit => produit.details, { onDelete: "CASCADE" })
    produit: Produit;
}
