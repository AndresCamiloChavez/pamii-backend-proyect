import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPaylaod } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
