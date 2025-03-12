import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
async login(@Body() loginDto: LoginDto) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.motDePasse);

  if (!user) { 
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  return this.authService.login(user); // ✅ Retourne user + token
}

}
