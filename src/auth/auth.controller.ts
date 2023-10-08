import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { EmailContent } from 'src/common/helpers/email-content.interface';
import { CodeVerification, RecoverPassword } from './interfaces/recoverPassword';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.authService.login(loginUserDto);
  }

  @Post('sendCodeRecoverPassword')
  sendCodeRecoverPassword(@Body() bodyEmail: { email: string }) {
    return this.authService.sendCodeRecoverPassword(bodyEmail);
  }

  @Post('verificationCode')
  verificationCodeRecover(@Body() bodyCode: CodeVerification) {
    return this.authService.verificationCode(bodyCode);
  }

  @Post('recoverPassword')
  recoverPassword(@Body() recoverPasswordBody: RecoverPassword) {
    return this.authService.recoverPassword(recoverPasswordBody);
  }

  @Post('sendEmail')
  sendEmail(@Body() emailContent: EmailContent) {
    return this.authService.sendEmail(emailContent);
  }
}
