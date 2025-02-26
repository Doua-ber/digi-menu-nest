import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //constructor(bookingService : BookingService){}
  getHello(): string {
    return 'Hello Doua!';
  }
  getHelloWorld() {
    return "Hello World!";
  }
  sayWelcomeToTheUser(userName : string){
    return "Welcome to " + userName;
  }
}
