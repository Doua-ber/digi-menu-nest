import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategyClient';
import { Client } from 'src/client/entities/client.entity';
import { ClientModule } from 'src/client/client.module';
import { AuthClientController } from './auth-client.controller';
import { AuthClientService } from './auth-client.service';



  @Module({
    imports: [
      TypeOrmModule.forFeature([Client]),
      PassportModule,
      JwtModule.register({
        secret: "07e15142e4820f1aaea9c2502e93cc4c0595b3713f8adb9bcdb723852cbaed16e08891665fc6aac99760769161c68373248b542fc9bfeee444849e96fe2c7369",
        signOptions: { expiresIn: '60m' },
      }),
      ClientModule,
    ],
    controllers: [AuthClientController],
    providers: [AuthClientService, JwtStrategy],
    exports: [AuthClientService],
  }) 
export class AuthClientModule {}
