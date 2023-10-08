import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPaylaod } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Transporter } from 'nodemailer';
import { EmailContent } from 'src/common/helpers/email-content.interface';
import {
  expirationTime,
  generateRandomCode,
} from 'src/common/helpers/functions-helpers';
import {
  CodeVerification,
  RecoverPassword,
} from './interfaces/recoverPassword';
import { MessageDefault } from 'src/common/helpers/message-default.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('MAILER') private readonly mailer: Transporter,
  ) {}

  async login(loginUserDto: LoginUserDTO) {
    const { password, email } = loginUserDto;

    let user = await this.userService.findOneEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales invalidas');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales invalidas');

    user = await this.userService.findOne(user.id);
    delete user.password;
    return { user: { ...user }, token: this.getJwtToken({ id: user.id }) };
  }

  async sendCodeRecoverPassword(bodyEmail: { email: string }) {
    let user = await this.userService.findOneEmail(bodyEmail.email);

    user.resetCode = generateRandomCode();
    user.resetCodeTimestamp = Date.now();
    await this.userService.updateUser(user);

    const emailContent: EmailContent = {
      to: user.email,
      subject: 'Recuperación de cuenta',
      text: `Estimado Usuario,

      Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para continuar con este proceso, necesitas ingresar el código de seguridad que te proporcionamos a continuación:
      
      Código de Seguridad: ${user.resetCode}
      
      Por favor, sigue estos pasos para cambiar tu contraseña:
      
      Deberás ingresar a Pamii alli el código de seguridad proporcionado arriba.
      
      Luego, podrás establecer una nueva contraseña para tu cuenta. Asegúrate de elegir una contraseña segura y única que no hayas utilizado anteriormente en este sitio o en otros servicios en línea.
      
      Si no has solicitado este cambio de contraseña, te recomendamos que tomes medidas para proteger tu cuenta y contactes a nuestro equipo de soporte de inmediato en support@pamii.com.
      
      Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
      
      Gracias por tu cooperación.
      
      Atentamente,
      
      El Equipo de Soporte de Pamii`,
      html: '',
    };
    await this.sendEmail(emailContent);
  }

  async verificationCode(bodyCode: CodeVerification) {
    let user = await this.userService.findOneEmail(bodyCode.email);

    if (!user || user.resetCode != bodyCode.code)
      throw new NotFoundException('Código de restablecimiento inválido');
    const currentTime = Date.now();

    if (currentTime - user.resetCodeTimestamp > expirationTime) {
      throw new BadRequestException(
        'El código de restablecimiento ha caducado',
      );
    }

    const messageResponse: MessageDefault = {
      message: 'El código es válido',
    };
    return messageResponse;
  }

  async recoverPassword(recoverPasswordBody: RecoverPassword) {
    let userRecover = await this.userService.recoverPasswordUser(
      recoverPasswordBody,
    );
    delete userRecover.password;
    return {
      user: { ...userRecover },
      token: this.getJwtToken({ id: userRecover.id }),
    };
  }

  async sendEmail(emailContent: EmailContent): Promise<void> {
    await this.mailer.sendMail({
      from: process.env.EMAIL_SEND,
      to: emailContent.to,
      subject: emailContent.subject,
      text: emailContent.text,
    });
  }

  private getJwtToken(payload: JwtPaylaod) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
