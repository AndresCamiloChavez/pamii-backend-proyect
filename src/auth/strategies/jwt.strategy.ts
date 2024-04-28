import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPaylaod } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (request) => {
        if (request && request.headers.authorization) {
          return request.headers.authorization;
        }
        return null;
      },
      secretOrKey: "PamiIToKenSr3t0Key",
    });
  }

  /**
   * Método que válida si el usuario es válido
   * @param payload objeto de JWT
   */
  async validate(payload: JwtPaylaod): Promise<User> {
    const { id } = payload;
    const user = await this.userService.findOne(id);
    if (!user) throw new UnauthorizedException('Token no válido');
    if (!user.isActive)
      throw new UnauthorizedException('Usurio no está activo');
    return user; // esto se añade a la request
  }
}
