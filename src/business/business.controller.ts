import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('register')
  create(@Body() createUserDto: CreateBusinessDto) {
    return this.businessService.create(createUserDto);
  }
  @Get()
  getAllBusiness() {
    return this.businessService.findAll();
  }

  @Get(':id')
  getBusiness(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }
  
  @Delete('deactivate/:id')
  desactivateUser(@Param('id') id: string) {
    return this.businessService.desactivate(id);
  }
}
