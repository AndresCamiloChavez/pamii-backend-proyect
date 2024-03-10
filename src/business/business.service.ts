import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import * as bcrypt from 'bcrypt';
import { handleDBErrors } from 'src/common/helpers/handle-db-errors';
import { MessageDefault } from 'src/common/helpers/message-default.interface';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto) {
    try {
      const {
        name,
        description,
        urlLogo,
        urlFrontPage,
        address,
        password,
        email,
        isActive,
      } = createBusinessDto;

      const newBusiness = this.businessRepository.create({
        name,
        description,
        urlLogo,
        urlFrontPage,
        address,
        email,
        password: bcrypt.hashSync(password, 10), // encriptando la contraseña
        isActive,
      });
      await this.businessRepository.save(newBusiness);
      delete newBusiness.password;
      return newBusiness;
    } catch (error) {
      handleDBErrors(error);
    }
  }

  findAll() {
    return this.businessRepository.find();
  }
  async findOne(id: string) {
    const business = await this.businessRepository.findOneBy({ id });
    if (!business) throw new NotFoundException('No existe el usuario');
    return business;
  }

  async desactivate(idBusiness: string) {
    const business = await this.findOne(idBusiness);
    if (!business) throw new NotFoundException('Usuario no existe');
    business.isActive = false;
    const businessDesactivate = await this.businessRepository.save(business);
    const messageResponse: MessageDefault = {
      message: 'Negocio desactivado ' + businessDesactivate.name,
    };
    return messageResponse;
  }

}
