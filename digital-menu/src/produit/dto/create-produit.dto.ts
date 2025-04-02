import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProduitDto {
  @IsString()
  nomEng: string;

  @IsString()
  nomAr: string;

  @IsString()
  descEng: string;

  @IsString()
  descAr: string;

  @IsNumber()
  prix: number;

  @IsString()
  image: string;

  @IsNumber()
  stock: number;

  @IsBoolean()
  disponibilite: boolean;

  @IsNumber()
  rubriqueId: number;

  @IsNumber()
  restaurantId: number;

  @IsNumber()
  ingredientsIds: number[];

}


