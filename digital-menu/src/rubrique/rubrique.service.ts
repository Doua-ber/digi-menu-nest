import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubrique } from './entities/rubrique.entity';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class RubriqueService {
  constructor(
    @InjectRepository(Rubrique)
    private readonly rubriqueRepository: Repository<Rubrique>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}
  async create(dto: CreateRubriqueDto, manager: Manager): Promise<Rubrique> {
    const restaurant = await this.restaurantRepository.findOne({
      where: {
        id: dto.restaurantId,
        managers: {
          id: manager.id,
        },
      },
      relations: ['managers'],
    });
  
    if (!restaurant) {
      throw new NotFoundException(`Restaurant non trouvé ou n'appartient pas à ce manager`);
    }
  
    const rubrique = this.rubriqueRepository.create({
      nomEng: dto.nomEng,
      nomAr: dto.nomAr,
      restaurant, // ici on lie la rubrique au restaurant validé
    });
  
    return await this.rubriqueRepository.save(rubrique);
  }
  async findAllByRestaurant(restaurantId: number): Promise<Rubrique[]> {
    return await this.rubriqueRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });
  }
  
  

  async findAll(): Promise<Rubrique[]> {
    return await this.rubriqueRepository.find();
  }

  async findOne(id: number): Promise<Rubrique> {
    const rubrique = await this.rubriqueRepository.findOne({ where: { id } });
    if (!rubrique) {
      throw new NotFoundException(`Rubrique avec l'ID ${id} non trouvée`);
    }
    return rubrique;
  }

  async update(id: number, updateRubriqueDto: UpdateRubriqueDto): Promise<Rubrique> {
    const rubrique = await this.rubriqueRepository.findOne({ where: { id } });
    if (!rubrique) {
      throw new NotFoundException(`Rubrique avec l'ID ${id} non trouvée`);
    }
    Object.assign(rubrique, updateRubriqueDto); // Met à jour les propriétés
    return await this.rubriqueRepository.save(rubrique);
  }

  async remove(id: number): Promise<void> {
    const rubrique = await this.rubriqueRepository.findOne({ where: { id } });
    if (!rubrique) {
      throw new NotFoundException(`Rubrique avec l'ID ${id} non trouvée`);
    }
    await this.rubriqueRepository.remove(rubrique);
  }
}
