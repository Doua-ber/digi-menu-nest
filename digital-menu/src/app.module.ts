import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importation des modules
import { RestaurantModule } from './restaurant/restaurant.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { CommandeModule } from './commande/commande.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { CategorieModule } from './categorie/categorie.module';
import { ProduitModule } from './produit/produit.module';
import { RubriqueModule } from './rubrique/rubrique.module';
import { AuthClientModule } from './auth-client/auth-client.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsGuard } from './permission/permissions.guard';
import { RestaurantRequestModule } from './restaurant-request/restaurant-request.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'douaDB123+-',
        database: process.env.DB_NAME || 'digitalMenuDb',
        autoLoadEntities: true,
        synchronize: false, // Désactive cette option en production
        migrations: ['dist/migrations/*.js'],
        cli: { migrationsDir: 'src/migrations' },
      }),
    }),
    // Importation des modules métier
    RestaurantModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ClientModule,
    CommandeModule,
    AdminModule,
    ManagerModule,
    CategorieModule,
    ProduitModule,
    RubriqueModule,
    AuthClientModule,
    AuthModule,
    RestaurantRequestModule,
    IngredientModule, // AuthModule gère déjà AuthService
  ],
  controllers: [AppController],
  providers: [AppService,PermissionsGuard],
})
export class AppModule {}
