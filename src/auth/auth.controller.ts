import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/SignupDto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(JwtAuthGuard)  // Applique le garde JWT
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;  // Le userId est ajouté au request par le JWT Guard
    return this.authService.getProfile(userId);
  }
}
