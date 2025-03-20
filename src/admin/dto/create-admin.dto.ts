import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAdminDto {
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

  @IsOptional()
  isAdmin?: boolean;

  @IsNotEmpty()
  @IsInt()
  roleId: number; 
}
