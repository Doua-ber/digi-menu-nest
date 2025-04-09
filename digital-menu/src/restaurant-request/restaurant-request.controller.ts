import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { RestaurantRequestService } from './restaurant-request.service';
import { UpdateRestaurantRequestDto } from './dto/update-restaurant-request.dto';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantRequest } from './entities/restaurant-request.entity';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { AdminGuard } from 'src/admin/AdminGuard';
import { Gouvernorat } from 'src/common/enums/gouvernorat.enum';

@Controller('restaurant-request')
export class RestaurantRequestController {
  constructor(
    private readonly restaurantRequestService: RestaurantRequestService,
    
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  

  @Get()
  @UseGuards(JwtAuthGuard,AdminGuard)
  async getAllRequests(): Promise<RestaurantRequest[]> {
    return this.restaurantRequestService.getAllRequests();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantRequestDto: UpdateRestaurantRequestDto) {
    return this.restaurantRequestService.updateRequest(+id, updateRestaurantRequestDto);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantRequestService.remove(+id);
  }

  @Post()
  async createRequest(
    @Body() data: {
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      nomRestaurant: string,
      gouvernorat:Gouvernorat,
      adresseEng: string,
      adresseAr: string,
      categorieId : number
      
    },
    @Req() req: Request,
  ): Promise<RestaurantRequest> {
    return this.restaurantRequestService.createRequest(data);
  }

  @Post(':id/approve')
@UseGuards(JwtAuthGuard,AdminGuard) // Protéger l'endpoint avec JwtAuthGuard
async approveRequest(
  @Param('id') requestId: number,
): Promise<{ message: string; restaurant?: Restaurant }> {
  return this.restaurantRequestService.approveRequest(requestId);
}
@Post(':id/reject')
@UseGuards(JwtAuthGuard,AdminGuard)
async rejectRequest(
  @Param('id') requestId: number,
): Promise<{ message: string }> {
  return this.restaurantRequestService.rejectRequest(requestId);
}
}
