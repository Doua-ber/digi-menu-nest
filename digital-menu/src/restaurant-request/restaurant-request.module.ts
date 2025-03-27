import { Module } from '@nestjs/common';
import { RestaurantRequestService } from './restaurant-request.service';
import { RestaurantRequestController } from './restaurant-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRequest } from './entities/restaurant-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { UserService } from 'src/user/user.service';
import { ManagerService } from 'src/manager/manager.service';
import { Categorie } from 'src/categorie/entities/categorie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantRequest,Restaurant,Manager,Role,User,Categorie]),
    RestaurantModule, 
  ],
  controllers: [RestaurantRequestController],
  providers: [RestaurantRequestService,UserService,ManagerService],
})
export class RestaurantRequestModule {}
