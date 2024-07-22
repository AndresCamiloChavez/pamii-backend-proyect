import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as nodemailer from 'nodemailer';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    BusinessModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      // son modulos asincrónos para que cargen primero las variables de entorno
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: 'PamiIToKenSr3t0Key',
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'MAILER',
      useFactory: async () => {
        return nodemailer.createTransport({
          host: 'smtp.gmail.com', // Cambia esto al servidor SMTP que estás utilizando
          port: 587,
          secure: false, // true para SSL
          auth: {
            user: 'camiloandresramirezchavez@gmail.com',
            pass: 'blbz fbom qqwz hutx',
          },
        });
      },
    },
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
