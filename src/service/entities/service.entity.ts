// // src/entities/servicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
// import { Business } from './business.entity';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  genericPhoto: string;

  // Relación muchos a muchos con User
//   @ManyToMany(() => User)
//   @JoinTable()
//   users: User[];

  // Relación muchos a muchos con Business
//   @ManyToMany(() => Business)
//   @JoinTable()
//   businesses: Business[];
}
