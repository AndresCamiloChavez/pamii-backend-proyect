import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/service.entity';
import { Repository } from 'typeorm';
import { handleDBErrors } from 'src/common/helpers/handle-db-errors';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviceRepository: Repository<Servicio>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    try {
      const service = await this.serviceRepository.findOneBy({
        name: createServiceDto.name.toLocaleLowerCase(),
      });

      if (service) {
        throw new Error('Servicio ya se encuentra');
      }

      const newService = this.serviceRepository.create({ ...createServiceDto });
      await this.serviceRepository.save(newService);
      return newService;
    } catch (error) {
      handleDBErrors(error);
    }
  }

  findAll() {

    return this.serviceRepository.find();
  }

  async findOne(id: string) {
    const services = await this.serviceRepository.findOneBy({ id });
    if (!services) throw new NotFoundException('No existe el neogocio');
    return services;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      id: id,
      ...updateServiceDto,
    });
  
    if (!service) {
      throw new NotFoundException(`No se encontró el servicio con el ID ${id}`);
    }
  
    try {
      return await this.serviceRepository.save(service);
    } catch (error) {
      handleDBErrors(error);
    }
  }
  
  async remove(id: string) {
    const service = await this.findOne(id); // Reutiliza el método findOne para verificar si existe el servicio
    try {
      await this.serviceRepository.remove(service);
      return { message: `El servicio con el ID ${id} ha sido eliminado` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
  
}
