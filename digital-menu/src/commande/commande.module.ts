import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande,Detail])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
