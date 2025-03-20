import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupClientDto {
  @IsNotEmpty()
  nom: string;


  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  motDePasse: string;
  
}
