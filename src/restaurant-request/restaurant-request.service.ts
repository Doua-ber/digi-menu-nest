import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateRestaurantRequestDto } from './dto/update-restaurant-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantRequest } from './entities/restaurant-request.entity';
import { ManagerService } from 'src/manager/manager.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateRestaurantRequestDto } from './dto/create-restaurant-request.dto';



@Injectable()

export class RestaurantRequestService {
  constructor(
    @InjectRepository(RestaurantRequest)
    private restaurantRequestRepository: Repository<RestaurantRequest>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    private readonly managerService: ManagerService,
    private readonly userService: UserService,

  ) {}
  
 
  findAll() {
    return `This action returns all restaurantRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantRequest`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} restaurantRequest`;
  }

  // Créer une demande de création de restaurant
  async createRequest(data: CreateRestaurantRequestDto): Promise<RestaurantRequest> {
    // Hacher le mot de passe
    const saltRounds = 10; // Nombre de tours de hachage (plus c'est élevé, plus c'est sécurisé)
    const hashedPassword = await bcrypt.hash(data.motDePasse, saltRounds);
  
    // Créer la demande avec le mot de passe haché
    const request = this.restaurantRequestRepository.create({
      ...data,
      motDePasse: hashedPassword, // Remplacer le mot de passe en clair par le mot de passe haché
    });
  
    // Sauvegarder la demande dans la base de données
    return this.restaurantRequestRepository.save(request);
  }

  // Approuver une demande et créer le restaurant
  async approveRequest(requestId: number): Promise<{ message: string; restaurant?: Restaurant }> {
    // Trouver la demande
    const request = await this.restaurantRequestRepository.findOne({
      where: { id: requestId },
    });
  
    if (!request) {
      return { message: 'ID introuvé' }; 
    }
  
    // Créer le restaurant
    const restaurant = this.restaurantRepository.create({
      nom: request.nomRestaurant,
      adresseEng: request.adresseEng,
      adresseAr: request.adresseAr,
      qrCode: `QR_CODE_${request.nomRestaurant}_${Date.now()}`,
      isActive: true,
    });
  
    // Sauvegarder le restaurant
    const savedRestaurant = await this.restaurantRepository.save(restaurant);
  
    // Créer un manager
    const managerData = {
      nom: request.nom,
      email: request.email,
      motDePasse: request.motDePasse,
      roleId: 2, // ID du rôle Manager
      isOwner: true, // Définir isOwner
    };
  
    const manager = await this.managerService.create(managerData);
  
    // Associer le manager au restaurant
    savedRestaurant.managers = [manager];
    await this.restaurantRepository.save(savedRestaurant);
  
    // Supprimer la demande
    await this.restaurantRequestRepository.remove(request);
  
    // Retourner un message de succès et les détails du restaurant
    return {
      message: 'Demande approuvée avec succès',
      restaurant: savedRestaurant,
    };
  }
  async rejectRequest(requestId: number): Promise<{ message: string }> {
    // Trouver la demande
    const request = await this.restaurantRequestRepository.findOne({
      where: { id: requestId },
    });
  
    if (!request) {
      return { message: 'ID introuvé' }; // Retourner un message d'erreur si l'ID est introuvable
    }
  
    // Supprimer la demande
    await this.restaurantRequestRepository.remove(request);
  
    // Retourner un message de succès
    return { message: 'Demande rejetée avec succès' };
  }
  async getAllRequests(): Promise<RestaurantRequest[]> {
    return this.restaurantRequestRepository.find();
  }
  async updateRequest(id: number, data: UpdateRestaurantRequestDto): Promise<RestaurantRequest> {
    const existingRequest = await this.restaurantRequestRepository.findOne({ where: { id } });
    if (!existingRequest) {
      throw new Error('Demande non trouvée');
    }
  
    if (data.motDePasse) {
      const saltRounds = 10;
      data.motDePasse = await bcrypt.hash(data.motDePasse, saltRounds);
    }
  
    Object.assign(existingRequest, data);
    return this.restaurantRequestRepository.save(existingRequest);
  }
}