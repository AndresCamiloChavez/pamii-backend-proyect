import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Role } from 'src/common/entities/role.entity';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService],
  imports: [TypeOrmModule.forFeature([Business])],
  exports: [TypeOrmModule],
})
export class BusinessModule {}
