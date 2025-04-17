import { AppDataSource } from '../ormconfig';
import { Trip } from '../entities/Trip';
// Ensure no top-level repository access. Only use getRepository inside methods.
export class TripController {
  static async updateTrip(id: number, update: Partial<Trip>): Promise<Trip | null> {
    const repo = AppDataSource.getRepository(Trip);
    const trip = await repo.findOneBy({ id });
    if (!trip) return null;
    Object.assign(trip, update);
    await repo.save(trip);
    return trip;
  }

  static async deleteTrip(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Trip);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async createTrip(vehicleId: number, from: string, to: string, drivers: number[], shipments: number[]): Promise<Trip> {
    const repo = AppDataSource.getRepository(Trip);
    const trip = repo.create({ vehicleId, from, to, drivers, shipments });
    await repo.save(trip);
    return trip;
  }

  static async getAllTrips(): Promise<Trip[]> {
    const repo = AppDataSource.getRepository(Trip);
    return await repo.find();
  }

  static async getTripsByVehicle(vehicleId: number): Promise<Trip[]> {
    const repo = AppDataSource.getRepository(Trip);
    return await repo.find({ where: { vehicleId } });
  }

  static async getTripsByDriver(driverId: number): Promise<Trip[]> {
    const repo = AppDataSource.getRepository(Trip);
    return await repo
      .createQueryBuilder('trip')
      // SQLite does not support ANY. Use LIKE for simple-array fields.
      .where("(',' || trip.drivers || ',') LIKE :driverPattern", { driverPattern: `%,${driverId},%` })
      .getMany();
  }
}
