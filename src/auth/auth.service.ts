import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from './dto/SignupDto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { nom, email, motDePasse } = signupDto;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new UnauthorizedException('Email déjà utilisé');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Création de l'utilisateur
    const user = this.userRepository.create({
      nom,
      email,
      motDePasse: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, motDePasse } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { id: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async getProfile(userId: number) {
    // Charger l'utilisateur avec son rôle et les permissions du rôle
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role', 'role.permissions'], // Charger les permissions à travers le rôle
    });
  
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
  
    // Récupérer les permissions associées au rôle de l'utilisateur
    const permissions = user.role?.permissions || []; // Utilisation de l'opérateur de coalescence nulle
  
    // Mapper les permissions pour obtenir le titre en anglais et en arabe
    const permissionsWithTitles = permissions.map(permission => ({
      titleEng: permission?.titleEng || 'Title not available',
      titleAr: permission?.titleAr || 'Title not available',
    }));
  
    return {
      id: user.id,
      name: user.nom,
      email: user.email,
      role: user.role ? user.role.titleEng : 'No role', // Assurez-vous que le rôle existe
      permissions: permissionsWithTitles, // Retourne les permissions formatées
    };
  }
    }
