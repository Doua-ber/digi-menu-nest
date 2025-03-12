import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
      
      @InjectRepository(Role) // Injection du repo des rôles ✅
        private readonly roleRepository: Repository<Role>
      ) {}
    
      
    
      async create(createManagerDto: CreateManagerDto) {
        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10);
        createManagerDto.motDePasse = await bcrypt.hash(createManagerDto.motDePasse, salt);
      
        // Vérifie si le rôle existe avant d'attribuer à l'manager
        const role = await this.roleRepository.findOne({ where: { id: createManagerDto.roleId } });
      
        if (!role) {
          throw new Error('Role ID invalide');
        }
      
        // Crée un utilisateur (User)
        const user = this.userRepository.create({
          ...createManagerDto,
          role: role, // Assure-toi d'inclure le mot de passe hashé
          // autres propriétés de l'utilisateur si nécessaire
        });
      
      
        const manager = this.managerRepository.create({
          ...createManagerDto,
          role: role, // Association correcte du rôle ✅
        });
      
        // Sauvegarde le Manager
        return await this.managerRepository.save(manager);
      }
      

      async findAll() {
        return await this.managerRepository.find({ relations: ['role'] });
      }
    
      async findOne(id: number) {
        const manager = await this.managerRepository.findOne({ where: { id }, relations: ['role'] });
        
        if (!manager) {
          return { message: `Aucun manager trouvé avec l'ID ${id}` };
        }
      
        return manager;
      }
    
      async update(id: number, updateManagerDto: UpdateManagerDto) {
        const manager = await this.managerRepository.findOne({ where: { id } });
        if (!manager) {
          throw new Error(`Manager avec l'ID ${id} non trouvé`);
        }
    
        Object.assign(manager, updateManagerDto);
        
        this.managerRepository.save(manager);
        return manager.nom + "est mis a jour  avec  succes";
      }
    
      async remove(id: number) {
        const manager = await this.managerRepository.findOne({ where: { id } });
      
        if (!manager) {
          return { message: `Aucun manager trouvé avec l'ID ${id}, suppression annulée.` };
        }
      
        await this.managerRepository.remove(manager);
        return { message: `${manager.nom} a été supprimé avec succès.` };
      }
    }
    