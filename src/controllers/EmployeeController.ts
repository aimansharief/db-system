import { AppDataSource } from '../ormconfig';
import { Employee } from '../entities/Employee';
import { VehicleType } from '../entities/Vehicle';
// Ensure no top-level repository access. Only use getRepository inside methods.
export class EmployeeController {
  static async updateEmployee(id: number, update: Partial<Employee>): Promise<Employee | null> {
    const repo = AppDataSource.getRepository(Employee);
    const employee = await repo.findOneBy({ id });
    if (!employee) return null;
    Object.assign(employee, update);
    await repo.save(employee);
    return employee;
  }

  static async deleteEmployee(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Employee);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async createEmployee(
    name: string,
    surname: string,
    seniority: number,
    certifications: VehicleType[],
    isMechanic: boolean
  ): Promise<Employee> {
    const repo = AppDataSource.getRepository(Employee);
    const employee = repo.create({ name, surname, seniority, certifications, isMechanic });
    await repo.save(employee);
    return employee;
  }

  static async getAllEmployees(): Promise<Employee[]> {
    const repo = AppDataSource.getRepository(Employee);
    return await repo.find();
  }

  static async getMechanics(): Promise<Employee[]> {
    const repo = AppDataSource.getRepository(Employee);
    return await repo.find({ where: { isMechanic: true } });
  }

  static async certifyEmployee(name: string, surname: string, vehicleType: VehicleType): Promise<Employee | undefined> {
    const repo = AppDataSource.getRepository(Employee);
    const emp = await repo.findOne({ where: { name, surname } });
    if (emp && !emp.certifications.includes(vehicleType)) {
      emp.certifications.push(vehicleType);
      await repo.save(emp);
    }
    return emp === null ? undefined : emp;
  }
}
