import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, phone, password, email, birthDay, isActive } =
      createUserDto;

    const newUser = this.userRepository.create({
      firstName,
      lastName,
      phone,
      password: bcrypt.hashSync(password, 10), // encriptando la contraseña
      email,
      birthDay,
      isActive,
    });
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }, // para traer esos datos
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
