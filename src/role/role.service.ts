import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private rolesRepository: Repository<Role>,
      @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
    ) {}
    async create(createRoleDto: CreateRoleDto): Promise<Role> {
      const { titleEng, permissions } = createRoleDto;
  
      // Vérifier si permissions existe et n'est pas vide
      if (!permissions || permissions.length === 0) {
          throw new Error('Permissions list is empty or undefined');
      }
  
      // Récupérer les entités Permission à partir de leurs IDs
      const foundPermissions = await this.permissionRepository.findByIds(permissions);
  
      if (!foundPermissions.length) {
          throw new Error('No permissions found with the given IDs');
      }
  
      // Créer un nouveau rôle et lui associer les permissions trouvées
      const role = this.rolesRepository.create({ titleEng, permissions: foundPermissions });
  
      return await this.rolesRepository.save(role);
  }
   
  
  findAll() {
    const roles= this.rolesRepository.find();
    return roles;
    //return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existingRole = await this.rolesRepository.findOneBy({ id });

    if (!existingRole) {
        throw new Error(`Role with id ${id} not found`);
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
