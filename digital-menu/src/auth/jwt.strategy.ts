import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) {
          console.log(' Aucune requête ou cookies introuvables');
          return null;
        }
        console.log('Token extrait des cookies:', req.cookies['auth_token']);
        return req.cookies['auth_token']; 
      },
      secretOrKey: 'c16e2ca7ba8cede8d69b58f8b48eb3bb8e05d92bce2744cb11b68f7e7faf37c1dba49d15d477e6f3d77db0bbac96c287215257ec97507df84e29e387cd890de6',
    });
  }
  
  
  async validate(payload: any) {
    console.log('✅ Payload JWT:', payload);
  
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['role', 'role.permissions', ],
    });
  
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
  
    console.log(' Utilisateur authentifié (User):', user);
  
    let manager: Manager | null = null;
  
    //  Vérifie si le rôle est Manager pour chercher les restaurants
    //if (user instanceof Manager) {

    if (user.role.titleEng === 'Manager') {
      manager = await this.managerRepository.findOne({
        where: { id: payload.sub },
        relations: ['restaurants'],
      });
  
      if (manager) {
        // Ajoute la liste des restaurants au user retourné
        (user as any).restaurants = manager.restaurants;
      }
    }
  
    return user;
  }
}