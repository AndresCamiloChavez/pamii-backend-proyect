import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/entities/role.entity';

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

  @Column({ nullable: true })
  resetCode: string;

  @Column({ type: 'bigint', nullable: true })
  resetCodeTimestamp: number;

  // @ManyToOne(() => Role, role => role.users)
  // role: Role;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBerforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
