import { Injectable, NotFoundException } from '@nestjs/common';
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
        const commande = await this.commandeRepository.findOne({
            where: { id: commandeId },
            relations: ['restaurant'],
        });
        
       
        
        if (!commande) {
            throw new NotFoundException(`Commande avec ID ${commandeId} non trouvée !`);
        }
        
      const produit = await this.produitRepository.findOne({
        where: { id: produitId },
        relations: ['restaurant']
    });

    if (!produit || produit.restaurant.id !== commande.restaurant.id) {
        throw new NotFoundException(`Produit non trouvé ou n'appartient pas à ce restaurant.`);
    }
      console.log("Produit trouvé :", produit);

      
      
      
      if (!produit) {
          throw new NotFoundException(`Produit avec ID ${produitId} non trouvé !`);
      }
  
      if (produit.prix === undefined || produit.prix === null) {
          throw new NotFoundException(`Le produit ${produitId} ne possède pas de prix valide !`);
      }
  
  
      const detail = this.detailRepository.create({
          commande: { id: commandeId }, 
          produit: { id: produitId }, 
          quantite,
          totalLigne: produit.prix * quantite, 
      });
  
      const savedDetail = await this.detailRepository.save(detail);

    // 🔄 Mise à jour du totalPrix de la commande
    const allDetails = await this.detailRepository.find({
        where: { commande: { id: commandeId } }
    });

    const newTotalPrix = allDetails.reduce((acc, curr) => acc + curr.totalLigne, 0);

    commande.totalPrix = newTotalPrix;
    await this.commandeRepository.save(commande);

    return savedDetail;
  }
  

    async getDetailsByCommande(commandeId: number): Promise<Detail[]> {
        return this.detailRepository.find({ where: { commande: { id: commandeId } }, relations: ['produit'] });
    }

    async removeDetail(detailId: number): Promise<void> {
        await this.detailRepository.delete(detailId);
    }
}
