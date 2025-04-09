import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { CreateRoleManagerDto } from './dto/create-roleManager.dto';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private rolesRepository: Repository<Role>,
      @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(Restaurant)
              private readonly restaurantRepository: Repository<Restaurant>,
    ) {}
    async createManagerRole(createRoleManagerDto: CreateRoleManagerDto, gerantId: number,RestaurantId: number,): Promise<Role> {
      const { titleEng, permissions } = createRoleManagerDto;
    
      if (!permissions || permissions.length === 0) {
        throw new NotFoundException('Permissions list is empty or undefined');
      }
    
      // Filtrer les permissions avec scope 'manager'
      const foundPermissions = await this.permissionRepository.findBy({
        id: In(permissions),
        scope: 'manager',
      });
    
      if (!foundPermissions.length) {
        throw new NotFoundException('Aucune permission avec le scope **manager** n\'a été trouvée pour les ID donnés.');
      }
      const restaurant = await this.restaurantRepository.findOne({
        where: {
          id: RestaurantId,
          managers: { id: gerantId },
        },
        relations: ['managers'], // Charger les managers pour la vérification
      });
    
      if (!restaurant) {
        throw new NotFoundException(`Restaurant non trouvé ou n'appartient pas à ce manager`);
      }
    
      const role = this.rolesRepository.create({
        titleEng,
        permissions: foundPermissions,
        gerant: { id: gerantId },
        restaurant: restaurant

      });
    
      return await this.rolesRepository.save(role);
    }
    
    async create(createRoleDto: CreateRoleDto): Promise<Role> {
      const { titleEng, permissions } = createRoleDto;
  
      // Vérifier si permissions existe et n'est pas vide
      if (!permissions || permissions.length === 0) {
          throw new NotFoundException('Permissions list is empty or undefined');
      }
  
      // Récupérer les entités Permission à partir de leurs IDs
      const foundPermissions = await this.permissionRepository.findByIds(permissions);
  
      if (!foundPermissions.length) {
          throw new NotFoundException('No permissions found with the given IDs');
      }
  
      // Créer un nouveau rôle et lui associer les permissions trouvées
      const role = this.rolesRepository.create({ titleEng, permissions: foundPermissions });
  
      return await this.rolesRepository.save(role);
  }
   
  
  findAll() {
    const roles= this.rolesRepository.find();
    return roles;
    
  }


  async findAllByResto(restoId: number): Promise<Role[]> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restoId },
      relations: ['roles'],
    });
  
    if (!restaurant) {
      throw new NotFoundException(`Restaurant avec id ${restoId} est introuvable`);
    }
  
    return restaurant.roles;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existingRole = await this.rolesRepository.findOneBy({ id });

    if (!existingRole) {
        throw new NotFoundException(`Role with id ${id} not found`);
    }

    existingRole.titleEng = updateRoleDto.titleEng;
     return await this.rolesRepository.save(existingRole);
    
}
 
async remove(id: number) {
  const role = await this.rolesRepository.findOneBy({ id });

  if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
  }

  await this.rolesRepository.delete(id);
  return `Role #${id} has been removed successfully`;
}
 
}
