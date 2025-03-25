import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Repository } from 'typeorm';
import { Rubrique } from 'src/rubrique/entities/rubrique.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
      private readonly produitRepository: Repository<Produit>,
    @InjectRepository(Rubrique)
      private readonly rubriqueRepository: Repository<Rubrique>,
    @InjectRepository(Restaurant)
      private readonly restaurantRepository: Repository<Restaurant>,
    
  ) {}
  /*async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    // Chargez la rubrique associée
    const rubrique = await this.rubriqueRepository.findOne({
      where: { id: createProduitDto.rubriqueId },
    });
    if (!rubrique) {
      throw new NotFoundException(`Rubrique avec l'ID ${createProduitDto.rubriqueId} non trouvée`);
    }
  
    // Chargez le restaurant associé
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createProduitDto.restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant avec l'ID ${createProduitDto.restaurantId} non trouvé`);
    }
  
    // Créez le produit avec les relations
    const produit = this.produitRepository.create({
      ...createProduitDto,
      rubrique, // Associez la rubrique
      restaurant, // Associez le restaurant
    });
  
    return await this.produitRepository.save(produit);
  }*/

    async create(
      createProduitDto: CreateProduitDto,
      manager: Manager,
      selectedRestaurantId: number,
    ): Promise<Produit> {
      const rubrique = await this.rubriqueRepository.findOne({
        where: { id: createProduitDto.rubriqueId },
      });
    
      if (!rubrique) {
        throw new NotFoundException(`Rubrique avec l'ID ${createProduitDto.rubriqueId} non trouvée`);
      }
    
      // ⚠️ On vérifie que ce restaurant fait partie de ceux du manager
      const restaurant = await this.restaurantRepository.findOne({
        where: {
          id: selectedRestaurantId,
          managers: {
            id: manager.id,
          },
        },
        relations: ['managers'], // important pour que la condition sur 'managers' fonctionne
      });
      
    
      if (!restaurant) {
        throw new NotFoundException(`Restaurant non trouvé ou n'appartient pas à ce manager`);
      }
    
      const produit = this.produitRepository.create({
        ...createProduitDto,
        rubrique,
        restaurant,
      });
    
      return await this.produitRepository.save(produit);
    }
    async findAllByRestaurant(restaurantId: number): Promise<Produit[]> {
      return await this.produitRepository.find({
        where: { restaurant: { id: restaurantId } },
        relations: ['rubrique', 'restaurant'],
      });
    }
    
    

  async findAll(): Promise<Produit[]> {
    
    return await this.produitRepository.find({ relations: ['rubrique', 'restaurant'] });
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.produitRepository.findOne({ 
      where: { id },
      relations: ['rubrique', 'restaurant'] 
    });
    if (!produit) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }
    return produit;
  }
    

  

    
    async update(id: number, updateProduitDto: UpdateProduitDto): Promise<Produit | null> {
      
      const produit = await this.produitRepository.findOne({ 
        where: { id },
        relations: ['rubrique', 'restaurant'] 
      });
      if (!produit) {
        throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
      }
      await this.produitRepository.update(id, updateProduitDto);
      return await this.produitRepository.findOne({ 
        where: { id },
        relations: ['rubrique', 'restaurant'] 
      });
    }

  async remove(id: number): Promise<void> {
    await this.produitRepository.delete(id);
  }
}
