import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'c16e2ca7ba8cede8d69b58f8b48eb3bb8e05d92bce2744cb11b68f7e7faf37c1dba49d15d477e6f3d77db0bbac96c287215257ec97507df84e29e387cd890de6', 
    });
  } 

  async validate(payload: any) {
    console.log('Payload reçu dans JwtStrategy:', payload);
  
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['role', 'role.permissions'],
    });
  
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
  
    console.log('Utilisateur trouvé:', user);
    console.log('Permissions de l’utilisateur:', user.role?.permissions);
  
    return user;  
    
  
  }
}