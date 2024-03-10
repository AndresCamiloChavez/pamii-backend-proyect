import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column({ unique: true })
  name: string;

  // @OneToMany(() => User, user => user.role)
  // users: User[];
}