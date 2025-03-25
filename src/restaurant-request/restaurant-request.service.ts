import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateRestaurantRequestDto } from './dto/update-restaurant-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantRequest } from './entities/restaurant-request.entity';
import { ManagerService } from 'src/manager/manager.service';
import * as bcrypt from 'bcryptjs';
import { CreateRestaurantRequestDto } from './dto/create-restaurant-request.dto';
import { Categorie } from 'src/categorie/entities/categorie.entity';



@Injectable()

export class RestaurantRequestService {
  constructor(
    @InjectRepository(RestaurantRequest)
    private restaurantRequestRepository: Repository<RestaurantRequest>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
    
    private readonly managerService: ManagerService,

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
    // Vérifier si la catégorie existe
    const categorie = await this.categorieRepository.findOne({ where: { id: data.categorieId } });
    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'ID ${data.categorieId} introuvable`);
    }
  
    // Créer la demande en associant la catégorie
    const request = this.restaurantRequestRepository.create({
      ...data,
      categorie, // Assigner l'entité Categorie ici
    });
  
    return this.restaurantRequestRepository.save(request);
  }
  
  

  // Approuver une demande et créer le restaurant et un manager
  async approveRequest(requestId: number): Promise<{ message: string; restaurant?: Restaurant }> {
    // Trouver la demande
    const request = await this.restaurantRequestRepository.findOne({
      where: { id: requestId },
      relations: ['categorie'],
    });
  
    if (!request) {
      return { message: 'ID introuvé' };
    }
  
    // Vérifier si la demande est déjà approuvée
    if (request.isApproved || request.validatedAt) {
      throw new ConflictException('Cette demande a déjà été approuvée');
    }
  
    // Marquer la demande comme approuvée
    request.isApproved = true;
    request.validatedAt = new Date(); // Date de validation
    await this.restaurantRequestRepository.save(request); // Sauvegarder la demande mise à jour
  
    // Créer le restaurant
    const restaurant = this.restaurantRepository.create({
      nom: request.nomRestaurant,
      ville: request.ville,
      adresseEng: request.adresseEng,
      adresseAr: request.adresseAr,
      qrCode: `QR_CODE_${request.nomRestaurant}_${Date.now()}`,
      isActive: true,
      categorie: request.categorie,
    });
  
    // Sauvegarder le restaurant
    const savedRestaurant = await this.restaurantRepository.save(restaurant);
  
    // Vérifier si un manager avec cet email existe déjà
    let manager = await this.managerService.findByEmail(request.email);
  
    if (manager) {
      // Charger les restaurants du manager existant
      const existingRestaurants = await this.restaurantRepository.find({
        where: { managers: { id: manager.id } },
      });
  
      // Définir une limite de restaurants gérés par un manager
      const MAX_RESTAURANTS_PER_MANAGER = 5;
      if (existingRestaurants.length >= MAX_RESTAURANTS_PER_MANAGER) {
        throw new ConflictException(
          `Ce manager gère déjà ${MAX_RESTAURANTS_PER_MANAGER} restaurants et ne peut pas en gérer plus.`
        );
      }
    } else {
      // Créer un nouveau manager si l'email n'existe pas
      const managerData = {
        nom: request.nom,
        prenom: request.prenom,
        email: request.email,
        motDePasse: request.motDePasse,
        roleId: 5, // ID du rôle Manager ou bien await this.roleService.findIdByName('manager')
        isOwner: true, // Définir isOwner
      };
  
      manager = await this.managerService.create(managerData);
    }
  
    // Associer le manager au restaurant (ManyToMany)
    savedRestaurant.managers = [...(savedRestaurant.managers || []), manager];
    await this.restaurantRepository.save(savedRestaurant);
  
    // Associer le manager à la demande
    request.manager = manager;
    await this.restaurantRequestRepository.save(request);
  
    // Planifier la suppression après 15 jours de la validation
    setTimeout(async () => {
      const existingRequest = await this.restaurantRequestRepository.findOne({
        where: { id: requestId },
      });
  
      if (existingRequest && existingRequest.validatedAt) {
        const now = new Date();
        const diffInMillis = now.getTime() - new Date(existingRequest.validatedAt).getTime();
        const diffInDays = diffInMillis / (1000 * 3600 * 24); // Convertir en jours
  
        if (diffInDays >= 15) {
          await this.restaurantRequestRepository.remove(existingRequest);
          console.log(`Demande ID ${requestId} supprimée après 15 jours de validation`);
        }
      }
    }, 15 * 24 * 60 * 60 * 1000); // 15 jours en millisecondes
  
    console.log('Demande trouvée :', request);
    console.log('Catégorie associée :', request.categorie);
    console.log('Restaurant créé :', restaurant);
    console.log('Restaurant sauvegardé :', savedRestaurant);
    console.log('Manager créé ou trouvé :', manager);
  
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