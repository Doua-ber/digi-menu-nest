import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { Detail } from 'src/detail/entities/detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { StatutCommande } from 'src/common/enums/statutCommande.enum';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,

    @InjectRepository(Detail)
    private detailRepository: Repository<Detail>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Manager)
  private managerRepository: Repository<Manager>,
) {}
async createCommande(
  data: CreateCommandeDto, 
  client: Client, 
  restaurantId: number
): Promise<Commande> {

  const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
  if (!restaurant) {
    throw new NotFoundException('Restaurant non trouvé');
  }

  const commande = this.commandeRepository.create({
    ...data,
    
    client: { id: client.id },
    restaurant: { id: restaurant.id }
  });

  return this.commandeRepository.save(commande);
}

async changerStatutCommande(
  commandeId: number,
  nouveauStatut: StatutCommande,
  managerIdInput: number,
): Promise<Commande> {
  const commande = await this.commandeRepository.findOne({
    where: { id: commandeId },
    relations: ['managers'],
  });

  if (!commande) {
    throw new NotFoundException('Commande non trouvée');
  }


  const manager = await this.managerRepository.findOne({ where: { id: managerIdInput } });
  if (!manager) {
    throw new NotFoundException('Manager non trouvé');
  }


  commande.statut = nouveauStatut;

  // Ajouter le manager s'il n'est pas déjà lié
  const dejaPresent = commande.managers?.some(m => m.id === manager.id);
  if (!dejaPresent) {
    commande.managers = [...(commande.managers || []), manager];
  }
  console.log("managg:"+manager);
  return this.commandeRepository.save(commande);
}


/*
async changerStatutCommande(
  commandeId: number,
  nouveauStatut: StatutCommande,
  managerIdInput: number,
): Promise<Commande> {
  // Trouver la commande avec ses relations
  const commande = await this.commandeRepository.findOne({
    where: { id: commandeId },
    relations: ['managers', 'restaurant', 'restaurant.managers'],
  });

  if (!commande) {
    throw new NotFoundException('Commande non trouvée');
  }

  // Trouver le manager avec ses restaurants
  const manager = await this.managerRepository.findOne({
    where: { id: managerIdInput },
    relations: ['restaurants'],
  });

  if (!manager) {
    throw new NotFoundException('Manager non trouvé');
  }

  // Vérifier si le manager appartient au restaurant de la commande
  const managerAppartientAuRestaurant = manager.restaurants.some(
    restaurant => restaurant.id === commande.restaurant.id
  );

  if (!managerAppartientAuRestaurant) {
    throw new NotFoundException("Commande non trouvée ou n'appartient pas à ce manager");
  }

  commande.statut = nouveauStatut;

  // Ajouter le manager s'il n'est pas déjà lié
  const dejaPresent = commande.managers?.some(m => m.id === manager.id);
  if (!dejaPresent) {
    commande.managers = [...(commande.managers || []), manager];
  }

  return this.commandeRepository.save(commande);
}
*/



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
