import { AppDataSource } from '../ormconfig';
import { CargoPlane, InCityTruck, LongHaulTruck, VehicleType, Vehicle } from '../entities/Vehicle';
// Ensure no top-level repository access. Only use AppDataSource.getRepository inside methods.
export class VehicleController {
  static async updateVehicle(id: number, update: Partial<Vehicle>): Promise<Vehicle | null> {
    const repo = AppDataSource.getRepository(Vehicle);
    const vehicle = await repo.findOneBy({ id });
    if (!vehicle) return null;
    Object.assign(vehicle, update);
    await repo.save(vehicle);
    return vehicle;
  }

  static async deleteVehicle(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Vehicle);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async createVehicle(
    type: VehicleType,
    brand: string,
    load: number,
    capacity: number,
    year: number,
    numberOfRepairs: number
  ): Promise<Vehicle> {
    if (!['cargo_plane', 'in_city_truck', 'long_haul_truck'].includes(type)) {
      throw new Error('Invalid vehicle type');
    }
    const vehicle = AppDataSource.getRepository(Vehicle).create({ type, brand, load, capacity, year, numberOfRepairs });
    await AppDataSource.getRepository(Vehicle).save(vehicle);
    return vehicle;
  }

  static async getAllVehicles(): Promise<Vehicle[]> {
    return await AppDataSource.getRepository(Vehicle).find();
  }

  static async findByBrand(brand: string): Promise<Vehicle[]> {
    return await AppDataSource.getRepository(Vehicle).find({ where: { brand } });
  }
}
