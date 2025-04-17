import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { VehicleType } from './Vehicle';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  weight!: number;

  @Column('float')
  value!: number;

  @Column()
  customerId!: number;

  @Column()
  origin!: string;

  @Column()
  destination!: string;

  @Column('simple-array')
  route!: VehicleType[];
}
