import { DataSource } from 'typeorm';
import { Vehicle, CargoPlane, InCityTruck, LongHaulTruck } from './entities/Vehicle';
import { Employee } from './entities/Employee';
import { MechanicRepair } from './entities/MechanicRepair';
import { Customer } from './entities/Customer';
import { Shipment } from './entities/Shipment';
import { Trip } from './entities/Trip';

if (process.env.NODE_ENV !== 'test' && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please check your .env file or environment configuration.');
}

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
        entities: [Vehicle, CargoPlane, InCityTruck, LongHaulTruck, Employee, MechanicRepair, Customer, Shipment, Trip],
      }
    : {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: true, // For dev only; use migrations in production
        logging: false,
        entities: [Vehicle, CargoPlane, InCityTruck, LongHaulTruck, Employee, MechanicRepair, Customer, Shipment, Trip],
        migrations: [],
        subscribers: [],
      }
);

