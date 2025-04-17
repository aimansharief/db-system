import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { VehicleType } from './Vehicle';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  seniority!: number;

  @Column('simple-array')
  certifications!: VehicleType[];

  @Column()
  isMechanic!: boolean;
}
