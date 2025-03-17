
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
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
  @IsInt()
  roleId: number;

  @IsOptional() // Ce champ est facultatif
  @IsString()
  type: string; // 'manager' ou 'user' selon l'entité
}
