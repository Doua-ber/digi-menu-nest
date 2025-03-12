import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  
  @InjectRepository(Role) // Injection du repo des rôles ✅
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const salt = await bcrypt.genSalt(10);
    createAdminDto.motDePasse = await bcrypt.hash(createAdminDto.motDePasse, salt);

    // Vérifie si le rôle existe avant d'attribuer à l'admin
    const role = await this.roleRepository.findOne({ where: { id: createAdminDto.roleId } });

    if (!role) {
      throw new Error('Role ID invalide');
    }

    // Création de l'admin avec le rôle
    const admin = this.adminRepository.create({
      ...createAdminDto,
      role: role, // Association du rôle 
    });

    return this.adminRepository.save(admin);
  }
  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<Admin | string> {
    const admin = await this.adminRepository.findOne({ where: { id }, relations: ['role'] });
    if (!admin) {
      return 'ID introuvable';
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin | string> {
    const admin = await this.findOne(id);
    if (typeof admin === 'string') {
        return admin;
    }

    if (updateAdminDto.roleId) {
      const role = await this.roleRepository.findOne({ where: { id: updateAdminDto.roleId } });
      if (!role) {
          return "Role introuvable";
      }
  }

    // Hachage du mot de passe si fourni
    if (updateAdminDto.motDePasse) {
        const salt = await bcrypt.genSalt(10);
        updateAdminDto.motDePasse = await bcrypt.hash(updateAdminDto.motDePasse, salt);
    }

    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
}


  async remove(id: number): Promise<string> {
    const admin = await this.findOne(id);
    if (typeof admin === 'string') {
      return admin;
    }
    await this.adminRepository.remove(admin);
    return 'Admin supprimé avec succès';
  }
}
