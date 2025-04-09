import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { StatutCommande } from "src/common/enums/statutCommande.enum";

export class CreateCommandeDto {
    @IsNumber()
    totalPrix: number;

   

    @IsBoolean()
    livraison: boolean;//true:sur place - false: à livré 
}
