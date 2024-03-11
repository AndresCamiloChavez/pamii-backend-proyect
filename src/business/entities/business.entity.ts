import { Role } from 'src/common/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'urlLogo', type: 'text' })
  urlLogo: string;

  @Column({ name: 'urlFrontPage', type: 'text' })
  urlFrontPage: string;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({ name: 'isActive', type: 'bool', default: true })
  isActive: boolean;

  @Column({ name: 'password', type: 'text', select: false }) // cuando se realiza un find no obtiene la contraseña
  password: string;

  @Column({ name: 'email', type: 'text', unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.business)
  role: Role;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBerforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
