import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  vehicleId!: number;

  @Column()
  from!: string;

  @Column()
  to!: string;

  @Column('simple-array')
  drivers!: number[];

  @Column('simple-array')
  shipments!: number[];
}
