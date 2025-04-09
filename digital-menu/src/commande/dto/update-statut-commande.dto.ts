import { IsEnum, IsNumber } from 'class-validator';
import { StatutCommande } from 'src/common/enums/statutCommande.enum';

export class UpdateStatutCommandeDto {
    
    @IsNumber()
    commandeId: number;
  
    @IsEnum(StatutCommande)
    nouveauStatut: StatutCommande;
}
  