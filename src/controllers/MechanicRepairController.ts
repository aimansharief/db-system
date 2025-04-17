import { AppDataSource } from '../ormconfig';
import { MechanicRepair } from '../entities/MechanicRepair';
// Ensure no top-level repository access. Only use getRepository inside methods.
export class MechanicRepairController {
  static async updateRepair(id: number, update: Partial<MechanicRepair>): Promise<MechanicRepair | null> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    const repair = await repo.findOneBy({ id });
    if (!repair) return null;
    Object.assign(repair, update);
    await repo.save(repair);
    return repair;
  }

  static async deleteRepair(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async recordRepair(vehicleId: number, mechanicId: number, estimatedDays: number, actualDays: number): Promise<MechanicRepair> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    const repair = repo.create({ vehicleId, mechanicId, estimatedDays, actualDays });
    await repo.save(repair);
    return repair;
  }

  static async getRepairsByVehicle(vehicleId: number): Promise<MechanicRepair[]> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    return await repo.find({ where: { vehicleId } });
  }

  static async getRepairsByMechanic(mechanicId: number): Promise<MechanicRepair[]> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    return await repo.find({ where: { mechanicId } });
  }

  static async getAllRepairs(): Promise<MechanicRepair[]> {
    const repo = AppDataSource.getRepository(MechanicRepair);
    return await repo.find();
  }
}
