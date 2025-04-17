import { VehicleType } from '../entities/Vehicle';
import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { VehicleController } from '../controllers/VehicleController';

describe('VehicleController', () => {
  beforeAll(async () => {
    if (!TestDataSource.isInitialized) {
      await TestDataSource.initialize();
    }
  });
  afterAll(async () => {
    if (TestDataSource.isInitialized) {
      await TestDataSource.destroy();
    }
  });
  it('should create a Cargo Plane and store it', async () => {
    const vehicle = await VehicleController.createVehicle('cargo_plane', 'Boeing', 10000, 50000, 2020, 2);
    expect(vehicle.type).toBe('cargo_plane');
    expect(vehicle.brand).toBe('Boeing');
    const allVehicles = await VehicleController.getAllVehicles();
    expect(allVehicles.map(v => v.id)).toContain(vehicle.id);
  });

  it('should create an In-city Truck and store it', async () => {
    const vehicle = await VehicleController.createVehicle('in_city_truck', 'Tata', 2000, 8000, 2022, 1);
    expect(vehicle.type).toBe('in_city_truck');
    expect(vehicle.brand).toBe('Tata');
  });

  it('should create a Long Haul Truck and store it', async () => {
    const vehicle = await VehicleController.createVehicle('long_haul_truck', 'Volvo', 5000, 20000, 2021, 0);
    expect(vehicle.type).toBe('long_haul_truck');
    expect(vehicle.brand).toBe('Volvo');
  });

  it('should find vehicles by brand', async () => {
    await VehicleController.createVehicle('cargo_plane', 'Airbus', 12000, 60000, 2023, 0);
    const found = await VehicleController.findByBrand('Airbus');
    expect(found.length).toBeGreaterThan(0);
    expect(found[0].brand).toBe('Airbus');
  });

  it('should throw error for invalid vehicle type', async () => {
    // @ts-expect-error: testing invalid type
    await expect(VehicleController.createVehicle('bike', 'Yamaha', 100, 200, 2021, 0)).rejects.toThrow('Invalid vehicle type');
  });
});
