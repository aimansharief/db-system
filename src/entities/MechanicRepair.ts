import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MechanicRepair {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  vehicleId!: number;

  @Column()
  mechanicId!: number;

  @Column()
  estimatedDays!: number;

  @Column()
  actualDays!: number;
}
