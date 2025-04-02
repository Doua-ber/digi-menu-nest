import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { In, Repository } from 'typeorm';
import { Rubrique } from 'src/rubrique/entities/rubrique.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
      private readonly produitRepository: Repository<Produit>,
    @InjectRepository(Rubrique)
      private readonly rubriqueRepository: Repository<Rubrique>,
    @InjectRepository(Restaurant)
      private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Ingredient)
      private readonly ingredientRepository: Repository<Ingredient>,
    
  ) {}
  

  async create(
    createProduitDto: CreateProduitDto,
    manager: Manager,
    selectedRestaurantId: number,
    selectedIngredientsIds: number[],
  ): Promise<Produit> {
    // Vérifier si le restaurant appartient bien au manager
    const restaurant = await this.restaurantRepository.findOne({
      where: {
        id: selectedRestaurantId,
        managers: { id: manager.id },
      },
      relations: ['managers'], // Charger les managers pour la vérification
    });
  
    if (!restaurant) {
      throw new NotFoundException(`Restaurant non trouvé ou n'appartient pas à ce manager`);
    }
  
    // Vérifier si la rubrique appartient bien au restaurant sélectionné
    const rubrique = await this.rubriqueRepository.findOne({
      where: {
        id: createProduitDto.rubriqueId,
        restaurant: { id: selectedRestaurantId },
      },
    });
  
    if (!rubrique) {
      throw new NotFoundException(`Rubrique non trouvée ou n'appartient pas à ce restaurant`);
    }
  
    // Vérifier si tous les ingrédients existent
    const ingredients = await this.ingredientRepository.find({
      where: {
        id: In(selectedIngredientsIds),
      },
    });
  
    if (ingredients.length !== selectedIngredientsIds.length) {
      throw new NotFoundException(`Un ou plusieurs ingrédients sont introuvables`);
    }
  
    // Création du produit
    const produit = this.produitRepository.create({
      ...createProduitDto,
      rubrique,
      restaurant,
      ingredients,
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
