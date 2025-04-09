import { Controller, Post, Body, UseGuards, Get, Request, Res, UnauthorizedException } from '@nestjs/common';
import { SignupClientDto } from './dto/SignupClient.dto';
import { LoginClientDto } from './dto/loginCient.dto';
import { AuthClientService } from './auth-client.service';
import { Response } from 'express'; 
import { JwtClientAuthGuard } from './jwt-authClient.guard';

@Controller('auth-client')
export class AuthClientController {
  constructor(private authClientService: AuthClientService)
  {}

@Post('signup')
signup(@Body() signupDto: SignupClientDto) {
  return this.authClientService.signup(signupDto);
}

@Post('login')
async login(
  @Body() loginDto: LoginClientDto,
  @Res({ passthrough: true }) response: Response,
) {
  const loginResult = await this.authClientService.login(loginDto);

  // Configuration du cookie
  response.cookie('access_token', loginResult.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
    sameSite: 'lax',
  });

  // Retourne directement les données du client
  return loginResult.client; // ou loginResult.user selon ta logique interne
}

@UseGuards(JwtClientAuthGuard)

  @Get('profile')
  async getProfile(@Request() req) {
    console.log('Client connecté dans le contrôleur:', req.client.id);  
    if (!req.client) {
      throw new UnauthorizedException('Client non authentifié');
    }
    
    const clientId = req.client.id;
    console.log('ID du client récupéré:', clientId);
    return this.authClientService.getProfile(clientId);
  }
  



@Post('logout')
async logout(@Res({ passthrough: true }) response: Response) {
  response.clearCookie('access_token', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // En production, utilise HTTPS
    sameSite: 'lax', 
  });
  return { message: 'Logged out successfully' };
}
}

