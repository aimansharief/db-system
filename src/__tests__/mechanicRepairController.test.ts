import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { MechanicRepairController } from '../controllers/MechanicRepairController';

describe('MechanicRepairController', () => {
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
  it('should update a repair actualDays', async () => {
    const repair = await MechanicRepairController.recordRepair(9, 109, 5, 5);
    const updated = await MechanicRepairController.updateRepair(repair.id, { actualDays: 10 });
    expect(updated).not.toBeNull();
    expect(updated!.actualDays).toBe(10);
  });

  it('should delete a repair by id', async () => {
    const repair = await MechanicRepairController.recordRepair(10, 110, 2, 2);
    const deleted = await MechanicRepairController.deleteRepair(repair.id);
    expect(deleted).toBe(true);
    const shouldBeNull = await MechanicRepairController.updateRepair(repair.id, { actualDays: 99 });
    expect(shouldBeNull).toBeNull();
  });
  it('should record a repair and store it', async () => {
    const repair = await MechanicRepairController.recordRepair(1, 101, 2, 3);
    expect(repair.vehicleId).toBe(1);
    expect(repair.mechanicId).toBe(101);
    const allRepairs = await MechanicRepairController.getAllRepairs();
    expect(allRepairs.map(r => r.id)).toContain(repair.id);
  });

  it('should get repairs by vehicle', async () => {
    await MechanicRepairController.recordRepair(2, 102, 1, 1);
    const repairs = await MechanicRepairController.getRepairsByVehicle(2);
    expect(repairs.length).toBeGreaterThan(0);
    expect(repairs[0].vehicleId).toBe(2);
  });

  it('should get repairs by mechanic', async () => {
    await MechanicRepairController.recordRepair(3, 103, 4, 4);
    const repairs = await MechanicRepairController.getRepairsByMechanic(103);
    expect(repairs.length).toBeGreaterThan(0);
    expect(repairs[0].mechanicId).toBe(103);
  });
});
