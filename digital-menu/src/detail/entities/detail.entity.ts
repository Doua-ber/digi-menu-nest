import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { Produit } from "../../produit/entities/produit.entity";
import { Commande } from "../../commande/entities/commande.entity";


@Entity('details')
export class Detail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    quantite: number;

    @Column("float")
    totalLigne: number;
    
    

    //Si une commande est supprimée, ses détails sont supprimés
    @ManyToOne(() => Commande, commande => commande.details, { onDelete: "CASCADE" })
    commande: Commande;

    //Si un produit est supprimé, les détails correspondants sont aussi supprimés.
    @ManyToOne(() => Produit, produit => produit.details, { onDelete: "CASCADE" })
    produit: Produit;
}
