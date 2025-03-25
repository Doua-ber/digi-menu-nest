import { Controller, Post, Body, UseGuards, Get, Request, Res } from '@nestjs/common';
import { SignupClientDto } from './dto/SignupClient.dto';
import { LoginClientDto } from './dto/loginCient.dto';
import { AuthClientService } from './auth-client.service';
import { Response } from 'express'; 
import { JwtClientAuthGuard } from './jwt-authClient.guard';

@Controller('auth-client')
export class AuthClientController {constructor(private authClientService: AuthClientService) {}

@Post('signup')
signup(@Body() signupDto: SignupClientDto) {
  return this.authClientService.signup(signupDto);
}

@Post('login')
  async login(@Body() loginDto: LoginClientDto, @Res({ passthrough: true }) response: Response) {
    const loginResult = await this.authClientService.login(loginDto);

    // Configuration du cookie
    response.cookie('access_token', loginResult.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // En production, utilise HTTPS
      maxAge: 3600000, // 1 heure (en millisecondes)
      sameSite: 'lax', // Préférable d'utiliser "lax" pour éviter des problèmes CORS
    });

    return { message: 'Login successful' };  // Tu peux aussi renvoyer d'autres informations selon tes besoins
  }


@UseGuards(JwtClientAuthGuard)
@Get('profile')
async getProfile(@Request() req) {
  const clientId = req.client.id;
  return this.authClientService.getProfile(clientId);
}



@UseGuards(JwtClientAuthGuard)  // S'assurer que l'utilisateur est authentifié pour faire un logout
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

