import { Module } from '@nestjs/common';
import { RubriqueService } from './rubrique.service';
import { RubriqueController } from './rubrique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubrique } from './entities/rubrique.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rubrique,Restaurant])],
  controllers: [RubriqueController],
  providers: [RubriqueService],
  
})
export class RubriqueModule {}
