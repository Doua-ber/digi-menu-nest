import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express'; 


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) response: Response
  
) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.motDePasse);

  if (!user) {
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  const loginResult = await this.authService.login(user);

  // Configuration du cookie
  response.cookie('auth_token', loginResult.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 heure (en millisecondes)
    sameSite: 'lax'
  });

  // Retournez les infos utilisateur sans le token (optionnel)
  return { 
    user: {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role.titleEng,
      permissions: user.role.permissions.map((p) => p.titleEng),
      
    }
  };
}
@Post('logout')
async logout(@Res({ passthrough: true }) response: Response) {
  response.clearCookie('auth_token');
  return { message: 'Déconnexion réussie' };
}

}
