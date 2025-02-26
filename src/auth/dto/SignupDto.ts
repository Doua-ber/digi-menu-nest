import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  motDePasse: string;
  
}
