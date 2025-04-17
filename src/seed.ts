import { AppDataSource } from './ormconfig';
import { CargoPlane, InCityTruck, LongHaulTruck } from './entities/Vehicle';
import { Employee } from './entities/Employee';
import { MechanicRepair } from './entities/MechanicRepair';
import { Customer } from './entities/Customer';
import { Shipment } from './entities/Shipment';
import { Trip } from './entities/Trip';

async function seed() {
  await AppDataSource.initialize();

  // Vehicles
  const v1 = AppDataSource.manager.create(CargoPlane, { brand: 'Boeing', load: 10000, capacity: 50000, year: 2020, numberOfRepairs: 2, type: 'cargo_plane' });
  const v2 = AppDataSource.manager.create(InCityTruck, { brand: 'Tata', load: 2000, capacity: 8000, year: 2022, numberOfRepairs: 1, type: 'in_city_truck' });
  const v3 = AppDataSource.manager.create(LongHaulTruck, { brand: 'Volvo', load: 5000, capacity: 20000, year: 2021, numberOfRepairs: 0, type: 'long_haul_truck' });
  await AppDataSource.manager.save([v1, v2, v3]);

  // Employees
  const e1 = AppDataSource.manager.create(Employee, { name: 'John', surname: 'Doe', seniority: 5, certifications: ['cargo_plane'], isMechanic: true });
  const e2 = AppDataSource.manager.create(Employee, { name: 'Alice', surname: 'Smith', seniority: 3, certifications: ['in_city_truck'], isMechanic: false });
  await AppDataSource.manager.save([e1, e2]);

  // Customers
  const c1 = AppDataSource.manager.create(Customer, { name: 'Acme Corp', address: '123 Main St', phone1: '1234567890', phone2: '0987654321' });
  const c2 = AppDataSource.manager.create(Customer, { name: 'Beta Inc', address: '456 Side St', phone1: '1111111111', phone2: '2222222222' });
  await AppDataSource.manager.save([c1, c2]);

  // Shipments
  const s1 = AppDataSource.manager.create(Shipment, { weight: 500, value: 10000, customerId: 1, origin: 'Warehouse A', destination: 'Warehouse B', route: ['cargo_plane', 'long_haul_truck'] });
  const s2 = AppDataSource.manager.create(Shipment, { weight: 200, value: 4000, customerId: 2, origin: 'Warehouse X', destination: 'Warehouse Y', route: ['in_city_truck'] });
  await AppDataSource.manager.save([s1, s2]);

  // Mechanic Repairs
  const m1 = AppDataSource.manager.create(MechanicRepair, { vehicleId: 1, mechanicId: 1, estimatedDays: 3, actualDays: 4 });
  await AppDataSource.manager.save(m1);

  // Trips
  const t1 = AppDataSource.manager.create(Trip, { vehicleId: 1, from: 'Warehouse A', to: 'Warehouse B', drivers: [1, 2], shipments: [1] });
  await AppDataSource.manager.save(t1);

  console.log('Sample data seeded successfully.');
  await AppDataSource.destroy();
}

seed().catch(e => { console.error(e); process.exit(1); });
