import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private readonly categorieRepository: Repository<Categorie>,
  ) {}

  async create(createCategorieDto: CreateCategorieDto): Promise<{ message: string; categorie: Categorie }> {
    try {
      const categorie = this.categorieRepository.create(createCategorieDto);
      const savedCategorie = await this.categorieRepository.save(categorie);
      return { message: 'Catégorie créée avec succès', categorie: savedCategorie };
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la création de la catégorie');
    }
  }

  async findAll(): Promise<{ message: string; categories: Categorie[] }> {
    const categories = await this.categorieRepository.find();
    if (!categories.length) {
      throw new NotFoundException('Aucune catégorie trouvée');
    }
    return { message: 'Liste des catégories récupérée avec succès', categories };
  }

  async findOne(id: number): Promise<{ message: string; categorie: Categorie } | NotFoundException> {
    const categorie = await this.categorieRepository.findOne({ where: { id } });
    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'ID ${id} introuvable`);
    }
    return { message: 'Catégorie trouvée', categorie };
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto): Promise<{ message: string; categorie: Categorie } | NotFoundException> {
    const result = await this.categorieRepository.update(id, updateCategorieDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Catégorie avec l'ID ${id} introuvable`);
    }
    const updatedCategorie = await this.categorieRepository.findOne({ where: { id } });
    if (!updatedCategorie) {
      throw new NotFoundException(`Catégorie avec l'ID ${id} introuvable après mise à jour`);
    }
    return { message: 'Catégorie mise à jour avec succès', categorie: updatedCategorie };

  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.categorieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Catégorie avec l'ID ${id} introuvable`);
    }
    return { message: 'Catégorie supprimée avec succès' };
  }
}
