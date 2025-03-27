import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;

  @IsNotEmpty()
  @IsString()
  nomRestaurant: string;

  @IsNotEmpty()
  @IsString()
  adresseEng: string;

  @IsNotEmpty()
  @IsString()
  adresseAr: string;
  
  @IsNotEmpty()
  @IsNumber()
  categorieId: number;

  /*@IsNotEmpty()
  @IsNumber()
  managerId: number;
  */
}