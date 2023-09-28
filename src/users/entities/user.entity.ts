import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName', type: 'text' })
  firstName: string;

  @Column({ name: 'lastName', type: 'text' })
  lastName: string;

  @Column({ name: 'phone', type: 'text' })
  phone: string;

  @Column({ name: 'password', type: 'text', select: false }) // cuando se realiza un find no obtiene la contraseña
  password: string;

  @Column({ name: 'email', type: 'text', unique: true })
  email: string;

  @Column({ name: 'birthDay', type: 'text' })
  birthDay: string;

  @Column({ name: 'isActive', type: 'bool', default: true })
  isActive: boolean;
  
}
