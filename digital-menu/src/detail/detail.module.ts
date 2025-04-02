import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { Detail } from './entities/detail.entity';
import { Commande } from 'src/commande/entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from 'src/produit/entities/produit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail,Commande,Produit])],
  controllers: [DetailController],
  providers: [DetailService],
})
export class DetailModule {}
