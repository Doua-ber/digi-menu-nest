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
        @InjectRepository(Client) private clientRepository: Repository<Client>,
        private jwtService: JwtService,
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
    
      async login(loginDto: LoginClientDto): Promise<{ access_token: string }> {
        const { email, motDePasse } = loginDto;
        const client = await this.clientRepository.findOne({ where: { email } });
    
        if (!client || !(await bcrypt.compare(motDePasse, client.motDePasse))) {
          throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
    
        const payload = { id: client.id, email: client.email };
        const access_token = this.jwtService.sign(payload);
    
        return { access_token };
      }
    
      async getProfile(clientId: number) {
        // Charger l'utilisateur avec son rôle et les permissions du rôle
        const client = await this.clientRepository.findOne({
          where: { id: clientId },
          relations: ['role', 'role.permissions'], // Charger les permissions à travers le rôle
        });
      
        if (!client) {
          throw new UnauthorizedException('Utilisateur non trouvé');
        }
      
     
      
        return {
          id: client.id,
          name: client.nom + client.prenom,

          email: client.email,
        };
      }
        }