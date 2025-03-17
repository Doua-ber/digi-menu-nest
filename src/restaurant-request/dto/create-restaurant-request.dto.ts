import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

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
}