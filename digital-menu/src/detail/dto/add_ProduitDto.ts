import { IsNumber } from "class-validator";

export class AddProduitDto {
    @IsNumber()
    produitId: number;

    @IsNumber()
    quantite: number;
}
