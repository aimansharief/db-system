import { AppDataSource } from '../ormconfig';
import { Shipment } from '../entities/Shipment';
import { VehicleType } from '../entities/Vehicle';
// Ensure no top-level repository access. Only use getRepository inside methods.
export class ShipmentController {
  static async updateShipment(id: number, update: Partial<Shipment>): Promise<Shipment | null> {
    const repo = AppDataSource.getRepository(Shipment);
    const shipment = await repo.findOneBy({ id });
    if (!shipment) return null;
    Object.assign(shipment, update);
    await repo.save(shipment);
    return shipment;
  }

  static async deleteShipment(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Shipment);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async createShipment(weight: number, value: number, customerId: number, origin: string, destination: string, route: VehicleType[]): Promise<Shipment> {
    const repo = AppDataSource.getRepository(Shipment);
    const shipment = repo.create({ weight, value, customerId, origin, destination, route });
    await repo.save(shipment);
    return shipment;
  }

  static async getAllShipments(): Promise<Shipment[]> {
    const repo = AppDataSource.getRepository(Shipment);
    return await repo.find();
  }

  static async getShipmentsByCustomer(customerId: number): Promise<Shipment[]> {
    const repo = AppDataSource.getRepository(Shipment);
    return await repo.find({ where: { customerId } });
  }
}
