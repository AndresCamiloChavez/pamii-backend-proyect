import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessService } from './business.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('register')
  create(@Body() createUserDto: CreateBusinessDto) {
    return this.businessService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllBusiness() {
    return this.businessService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getBusiness(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete('deactivate/:id')
  desactivateUser(@Param('id') id: string) {
    return this.businessService.desactivate(id);
  }
}
