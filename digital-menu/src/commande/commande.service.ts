import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { Detail } from 'src/detail/entities/detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,

    @InjectRepository(Detail)
    private detailRepository: Repository<Detail>,
) {}
async createCommande(data: CreateCommandeDto, client: Client): Promise<Commande> {

  

  const commande = this.commandeRepository.create({
    ...data,
    client: { id: client.id }, 
  });
  
  return this.commandeRepository.save(commande);
}


async getCommandes(): Promise<Commande[]> {
  return this.commandeRepository.find({ relations: ['details', 'details.produit'] });
}

async getCommandeById(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });
    
    if (!commande) {
        throw new Error(`Commande avec ID ${id} non trouvée`);
    }

    return commande;
}


async deleteCommande(id: number): Promise<void> {
  await this.commandeRepository.delete(id);
}

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
