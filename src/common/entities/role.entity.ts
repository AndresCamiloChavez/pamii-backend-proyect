import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Business } from 'src/business/entities/business.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @OneToMany(() => Business, business => business.role)
  business: Business[];
}

export enum Roles{
  ADMINISTRATOR_NEGOCIO = '1',
  USUARIO = '2',
  CLIENTE = '3'
}
