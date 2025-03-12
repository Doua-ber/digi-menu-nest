import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async validateUser(email: string, pass: string): Promise<Manager | Admin | null> {
    let user: Manager | Admin | null = await this.managerRepository.findOne({
      where: { email },
      relations: ['role', 'role.permissions'], // Récupère les permissions du rôle
    });
  
    if (!user) {
      user = await this.adminRepository.findOne({
        where: { email },
        relations: ['role', 'role.permissions'],
      }) as Admin | null;
    }
  
    if (!user) {
      console.log('Utilisateur introuvable');
      return null;
    }
    console.log('Utilisateur trouvé :', user);
console.log('Rôle de l’utilisateur :', user?.role);
console.log('Permissions de ce rôle :', user?.role?.permissions);

 
  
    const isMatch = await bcrypt.compare(pass, user.motDePasse);
    if (!isMatch) return null;
  
    return user;
  }
  
  
  

login(user: Manager | Admin) {
  console.log('User au login:', user);

  const payload = {
    sub: user.id,
    roleId: user.role.id,
    permissions: user.role.permissions.map((p) => p.titleEng),
  };

  console.log('Token payload dans auth service:', payload);
  

  return {
    access_token: this.jwtService.sign(payload, { expiresIn: '1h' }), 

    user: {
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role.titleEng,
      permissions: user.role.permissions.map((p) => p.titleEng),
    },
  };
}

}
