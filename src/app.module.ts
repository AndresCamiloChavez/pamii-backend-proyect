import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { BusinessModule } from './business/business.module';
import { SeedModule } from './seed/seed.module';
import { RoleSeederService } from './subscribers/initial-data.subscriber';
import { Role } from './common/entities/role.entity';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "pamiidb.postgres.database.azure.com",
      port: 5432,
      database: "postgres",
      username: "postgres",
      password: "1eZ7Ow3cIOvJCm7",
      autoLoadEntities: true,
      synchronize: true, // en producción no, cuando se realiza un cambio se sincroniza
      ssl: {
        rejectUnauthorized: false
      }
    }),
    TypeOrmModule.forFeature([Role]),
    UsersModule,
    AuthModule,
    CommonModule,
    BusinessModule,
    SeedModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [RoleSeederService],
})
export class AppModule {}
