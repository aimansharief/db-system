import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle, CargoPlane, InCityTruck, LongHaulTruck } from '../entities/Vehicle';
import { Employee } from '../entities/Employee';
import { MechanicRepair } from '../entities/MechanicRepair';
import { Customer } from '../entities/Customer';
import { Shipment } from '../entities/Shipment';
import { Trip } from '../entities/Trip';

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [Vehicle, CargoPlane, InCityTruck, LongHaulTruck, Employee, MechanicRepair, Customer, Shipment, Trip],
});
