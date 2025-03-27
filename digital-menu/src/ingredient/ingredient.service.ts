import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }


  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({ where: { id } });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient avec l'ID ${id} non trouvé`);
    }
    return ingredient;
  }


  async update(id: number, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    const ingredient = await this.findOne(id);
    Object.assign(ingredient, updateIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }


  async remove(id: number): Promise<void> {
    const result = await this.ingredientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ingredient avec l'ID ${id} non trouvé`);
    }
  }

  
    
  }