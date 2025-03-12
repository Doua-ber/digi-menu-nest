import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { SignupClientDto } from './dto/SignupClient.dto';
import { LoginClientDto } from './dto/loginCient.dto';
import { JwtAuthGuard } from './jwt-authClient.guard';
import { AuthClientService } from './auth-client.service';
@Controller('auth-client')
export class AuthClientController {constructor(private authClientService: AuthClientService) {}

@Post('signup')
signup(@Body() signupDto: SignupClientDto) {
  return this.authClientService.signup(signupDto);
}

@Post('login')
login(@Body() loginDto: LoginClientDto) {
  return this.authClientService.login(loginDto);
}
@UseGuards(JwtAuthGuard)  // Applique le garde JWT
@Get('profile')
async getProfile(@Request() req) {
  const clientId = req.client.id;  // Le clientId est ajouté au request par le JWT Guard
  return this.authClientService.getProfile(clientId);
}
}
