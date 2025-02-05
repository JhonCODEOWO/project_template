import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/users.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

//Estrategia para trabajar con los datos dentro del payload.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService,
  ) {
    //Aplicar valores a el constructor principal
    super({
      secretOrKey: configService.getOrThrow('SECRET_WORD'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //Se va a ejecutar siempre y cuando el token siga activo y el token haga match con el payload
  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    //Obtener usuario en base a el id en el payload.
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { roles: { permisssions: true } },
    });

    if (!user)
      throw new UnauthorizedException('User dont exists in the database');

    if (!user.active)
      throw new UnauthorizedException('User is inactive, talk with admin');

    return user; //Este dato retornado se va a añadir al request general
  }
}
