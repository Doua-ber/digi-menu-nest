import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { Repository } from 'typeorm';
import { Detail } from './entities/detail.entity';

@Injectable()
export class DetailService {
    constructor(
        @InjectRepository(Detail)
        private detailRepository: Repository<Detail>,

        @InjectRepository(Commande)
        private commandeRepository: Repository<Commande>,

        @InjectRepository(Produit)
        private produitRepository: Repository<Produit>,
    ) {}

    async addProduitToCommande(commandeId: number, produitId: number, quantite: number): Promise<Detail> {
      const commande = await this.commandeRepository.findOne({ where: { id: commandeId } });
      const produit = await this.produitRepository.findOne({ where: { id: produitId } });
      console.log("Produit trouvé :", produit);

      if (!commande) {
          throw new Error(`Commande avec ID ${commandeId} non trouvée !`);
      }
      
      if (!produit) {
          throw new Error(`Produit avec ID ${produitId} non trouvé !`);
      }
  
      if (produit.prix === undefined || produit.prix === null) {
          throw new Error(`Le produit ${produitId} ne possède pas de prix valide !`);
      }
  
  
      const detail = this.detailRepository.create({
          commande: { id: commandeId }, 
          produit: { id: produitId }, 
          quantite,
          totalLigne: produit.prix * quantite, 
      });
  
      return this.detailRepository.save(detail);
  }
  

    async getDetailsByCommande(commandeId: number): Promise<Detail[]> {
        return this.detailRepository.find({ where: { commande: { id: commandeId } }, relations: ['produit'] });
    }

    async removeDetail(detailId: number): Promise<void> {
        await this.detailRepository.delete(detailId);
    }
}
