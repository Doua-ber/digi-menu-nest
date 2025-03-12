import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Initialisation correcte de Passport
    JwtModule.register({
      secret: 'c16e2ca7ba8cede8d69b58f8b48eb3bb8e05d92bce2744cb11b68f7e7faf37c1dba49d15d477e6f3d77db0bbac96c287215257ec97507df84e29e387cd890de6', // Doit correspondre à la clé utilisée dans JwtStrategy
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Manager, Admin]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
