import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginClientDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  motDePasse: string;
}
