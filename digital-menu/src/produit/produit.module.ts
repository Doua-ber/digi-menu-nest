import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Rubrique } from 'src/rubrique/entities/rubrique.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Produit,Restaurant,Rubrique,Ingredient]),
    
  ],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
