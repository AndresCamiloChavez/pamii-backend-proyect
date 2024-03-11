import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const roles = await this.roleRepository.find();
    if (roles.length === 0) {
      const initialRoles = [
        { name: 'Administrador de Negocio' },
        { name: 'Usuario' },
        { name: 'Cliente' },
      ];

      await this.roleRepository.save(initialRoles);
      console.log('Roles iniciales creados.');
    }
  }
}
