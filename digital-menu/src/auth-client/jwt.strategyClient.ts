import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Request } from 'express'; 



@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor, 
      ]),
      secretOrKey: "07e15142e4820f1aaea9c2502e93cc4c0595b3713f8adb9bcdb723852cbaed16e08891665fc6aac99760769161c68373248b542fc9bfeee444849e96fe2c7369",
    });
  }

  async validate(payload: { id: number }) {
    const client = await this.clientRepository.findOne({ where: { id: payload.id } });
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
  
}
const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
      console.log('Cookies reçus:', req.cookies);
      return req.cookies['access_token'] || null;
  }
  console.log("Aucun cookie trouvé");
  return null;
};
