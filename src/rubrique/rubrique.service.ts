import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubrique } from './entities/rubrique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RubriqueService {
  constructor(
    @InjectRepository(Rubrique)
    private readonly rubriqueRepository: Repository<Rubrique>,
  ) {}
  async create(createRubriqueDto: CreateRubriqueDto): Promise<Rubrique> {
    const rubrique = this.rubriqueRepository.create(createRubriqueDto);
    return await this.rubriqueRepository.save(rubrique);
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
