import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { Detail } from './entities/detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,

    @InjectRepository(Detail)
    private detailRepository: Repository<Detail>,
) {}
async createCommande(data: CreateCommandeDto): Promise<Commande> {
  const commande = this.commandeRepository.create(data);
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
