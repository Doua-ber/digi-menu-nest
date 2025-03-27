import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';
// @... = decorator
@Controller("/public")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/hello-world")
  getHelloWorld() {
    return this.appService.getHelloWorld();
  }

  
  @Post("/welcome")
  body(@Body("name") userName :string, @Req() req, @Res() res) {
    res.send(this.appService.sayWelcomeToTheUser(userName))
    
   
  }
}
