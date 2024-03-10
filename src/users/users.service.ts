import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MessageDefault } from 'src/common/helpers/message-default.interface';
import { RecoverPassword } from 'src/auth/interfaces/recoverPassword';
import { handleDBErrors } from 'src/common/helpers/handle-db-errors';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const {
        firstName,
        lastName,
        phone,
        password,
        email,
        birthDay,
        isActive,
      } = createUserDto;

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
    } catch (error) {
      handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('No existe el usuario');
    return user;
  }

  findOneEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        resetCode: true,
        resetCodeTimestamp: true,
      }, // para traer esos datos
    });
  }

  async recoverPasswordUser(recoverPassword: RecoverPassword) {
    const user = await this.findOneEmail(recoverPassword.email);
    if (!user) throw new NotFoundException('No existe el usuario');
    if (user.resetCode != recoverPassword.code)
      throw new NotFoundException('Código de restablecimiento inválido');
    user.password = bcrypt.hashSync(recoverPassword.password, 10);
    user.resetCode = null;
    user.resetCodeTimestamp = null;
    const userRecover = this.userRepository.save(user);
    return userRecover;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateUser(updateUser: User) {
    return await this.userRepository.save(updateUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async desactivate(idUser: string) {
    const user = await this.findOne(idUser);
    if (!user) throw new NotFoundException('Usuario no existe');
    user.isActive = false;
    const userDesactivate = await this.userRepository.save(user);
    const messageResponse: MessageDefault = {
      message: 'Usuario desactivado ' + userDesactivate.firstName,
    };
    return messageResponse;
  }


}
