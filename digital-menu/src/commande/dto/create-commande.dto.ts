import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCommandeDto {
    @IsNumber()
    totalPrix: number;

    @IsString()
    statut: string;

    @IsBoolean()
    isDelivered: boolean;
}
