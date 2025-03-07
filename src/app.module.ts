import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CommandeModule } from './commande/commande.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { CategorieModule } from './categorie/categorie.module';
import { ProduitModule } from './produit/produit.module';
import { RubriqueModule } from './rubrique/rubrique.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host:process.env.DB_HOST,
   
    port: 5432,
    username: 'postgres',
    password: 'douaDB123+-',
    database: 'digitalMenuDb',
    //entities: [Role,Permission],
    autoLoadEntities: true,
    synchronize: true,
    //logging: true,
  }),RestaurantModule, UserModule, RoleModule, PermissionModule, AuthModule, ClientModule, CommandeModule, AdminModule, ManagerModule, CategorieModule, ProduitModule, RubriqueModule],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}
 