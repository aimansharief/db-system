import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ChildEntity } from 'typeorm';

export type VehicleType = 'cargo_plane' | 'in_city_truck' | 'long_haul_truck';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  brand!: string;

  @Column('float')
  load!: number;

  @Column('float')
  capacity!: number;

  @Column()
  year!: number;

  @Column()
  numberOfRepairs!: number;

  @Column()
  type!: VehicleType;
}

@ChildEntity('cargo_plane')
export class CargoPlane extends Vehicle {}

@ChildEntity('in_city_truck')
export class InCityTruck extends Vehicle {}

@ChildEntity('long_haul_truck')
export class LongHaulTruck extends Vehicle {}
