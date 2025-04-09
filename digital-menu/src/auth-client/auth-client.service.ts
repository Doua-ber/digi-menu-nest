import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Client } from 'src/client/entities/client.entity';
import { SignupClientDto } from './dto/SignupClient.dto';
import { LoginClientDto } from './dto/loginCient.dto';


@Injectable()
export class AuthClientService {
    constructor(
      private readonly jwtService: JwtService,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
        
      ) {}
    
      async signup(signupDto: SignupClientDto): Promise<Client> {
        const { nom, prenom, email, motDePasse } = signupDto;
    
        // Vérifier si l'utilisateur existe déjà
        const clientExists = await this.clientRepository.findOne({ where: { email } });
        if (clientExists) {
          throw new UnauthorizedException('Email déjà utilisé');
        }
     
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
    
        // Création de l'utilisateur
        const client = this.clientRepository.create({
          nom,
          prenom,
          email,
          motDePasse: hashedPassword,
        });
    
        return this.clientRepository.save(client);
      }
    
      
      async login(loginDto: LoginClientDto): Promise<{ access_token: string; client: any }> {
        const { email, motDePasse } = loginDto;
      
        const client = await this.clientRepository.findOne({ where: { email } });
        if (!client) {
          throw new UnauthorizedException('Email ou mot de passe invalide');
        }
      
        const passwordIsValid = await bcrypt.compare(motDePasse, client.motDePasse);
        if (!passwordIsValid) {
          throw new UnauthorizedException('Email ou mot de passe invalide');
        }
      
        const payload = { sub: client.id };
const auth_token = this.jwtService.sign(payload, { expiresIn: '1h' });

console.log('Token JWT généré:', auth_token);  // Affiche le token généré pour voir si tout est correct

return {
  access_token: auth_token,  // Utilise `access_token` pour être cohérent avec le cookie
  client: {
    id: client.id,
    nom: client.nom,
    prenom: client.prenom,
    email: client.email,
  },
};

      }
      
      
    
      async getProfile(clientId: number) {
        console.log('Recherche du client avec ID:', clientId);
        const client = await this.clientRepository.findOne({ where: { id: clientId } });
      
        if (!client) {
          throw new UnauthorizedException('Utilisateur non trouvé');
        }
        
        console.log('Client trouvé dans la base de données:', client);
      
        return {
          id: client.id,
          name: client.nom + ' ' + client.prenom,
          email: client.email,
        };
      }
      
        }