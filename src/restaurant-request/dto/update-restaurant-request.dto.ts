import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateRestaurantRequestDto {
    @IsOptional()
    @IsString()
    nom?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    motDePasse?: string;
  
    @IsOptional()
    @IsString()
    nomRestaurant?: string;
  
    @IsOptional()
    @IsString()
    adresseEng?: string;
  
    @IsOptional()
    @IsString()
    adresseAr?: string;
  }