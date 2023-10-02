import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPaylaod } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDTO) {
    const { password, email } = loginUserDto;

    let user = await this.userService.findOneEmail(email);

    if (!user) throw new UnauthorizedException('Credenciales invalidas');w
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales invalidas');

    user = await this.userService.findOne(user.id);
    delete user.password;
    return { user: { ...user }, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPaylaod) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
