import { VehicleType } from '../entities/Vehicle';
import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { EmployeeController } from '../controllers/EmployeeController';

describe('EmployeeController', () => {
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
  it('should update an employee surname', async () => {
    const emp = await EmployeeController.createEmployee('Eve', 'OldSurname', 4, ['cargo_plane'], false);
    const updated = await EmployeeController.updateEmployee(emp.id, { surname: 'NewSurname' });
    expect(updated).not.toBeNull();
    expect(updated!.surname).toBe('NewSurname');
  });

  it('should delete an employee by id', async () => {
    const emp = await EmployeeController.createEmployee('Frank', 'DeleteMe', 1, ['in_city_truck'], false);
    const deleted = await EmployeeController.deleteEmployee(emp.id);
    expect(deleted).toBe(true);
    const shouldBeNull = await EmployeeController.updateEmployee(emp.id, { surname: 'ShouldNotUpdate' });
    expect(shouldBeNull).toBeNull();
  });
  it('should create an employee and store it', async () => {
    const emp = await EmployeeController.createEmployee('Alice', 'Smith', 3, ['cargo_plane'], false);
    expect(emp.name).toBe('Alice');
    expect(emp.certifications).toContain('cargo_plane');
    const allEmployees = await EmployeeController.getAllEmployees();
    expect(allEmployees.map(e => e.id)).toContain(emp.id);
  });

  it('should list only mechanics', async () => {
    await EmployeeController.createEmployee('Bob', 'Jones', 7, ['in_city_truck'], true);
    const mechanics = await EmployeeController.getMechanics();
    expect(mechanics.some(e => e.isMechanic)).toBe(true);
  });

  it('should certify an employee for a new vehicle type', async () => {
    await EmployeeController.createEmployee('Charlie', 'Brown', 2, ['long_haul_truck'], false);
    const updated = await EmployeeController.certifyEmployee('Charlie', 'Brown', 'cargo_plane');
    expect(updated?.certifications).toContain('cargo_plane');
  });
});
