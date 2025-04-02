import { IsNumber } from 'class-validator';

export class CreateDetailDto {
    @IsNumber()
    quantite: number;

    @IsNumber()
    commandeId: number;

    @IsNumber()
    produitId: number;
}
