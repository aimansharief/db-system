import { AppDataSource } from '../ormconfig';
import { Customer } from '../entities/Customer';
// Ensure no top-level repository access. Only use getRepository inside methods.
export class CustomerController {
  static async updateCustomer(id: number, update: Partial<Customer>): Promise<Customer | null> {
    const repo = AppDataSource.getRepository(Customer);
    const customer = await repo.findOneBy({ id });
    if (!customer) return null;
    Object.assign(customer, update);
    await repo.save(customer);
    return customer;
  }

  static async deleteCustomer(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Customer);
    const result = await repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
  static async createCustomer(name: string, address: string, phone1: string, phone2: string): Promise<Customer> {
    const repo = AppDataSource.getRepository(Customer);
    const customer = repo.create({ name, address, phone1, phone2 });
    await repo.save(customer);
    return customer;
  }

  static async getAllCustomers(): Promise<Customer[]> {
    const repo = AppDataSource.getRepository(Customer);
    return await repo.find();
  }

  static async findCustomerByName(name: string): Promise<Customer[]> {
    const repo = AppDataSource.getRepository(Customer);
    return await repo.find({ where: { name } });
  }
}
