import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginUserDto: LoginUserDTO) {
    const { password, email } = loginUserDto;

    const user = await this.userService.findOneEmail(email);

    if (!user) throw new UnauthorizedException('Credenciales invalidas');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales invalidas');
    return user;
    //todo reontar el jwt
  }
}
