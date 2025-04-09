import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from 'src/detail/entities/detail.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande,Detail,Restaurant,Manager])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
