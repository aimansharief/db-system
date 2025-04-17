import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { CustomerController } from '../controllers/CustomerController';

describe('CustomerController', () => {
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
  it('should update a customer address', async () => {
    const customer = await CustomerController.createCustomer('Gamma LLC', 'Old Address', '1112223333', '4445556666');
    const updated = await CustomerController.updateCustomer(customer.id, { address: 'New Address' });
    expect(updated).not.toBeNull();
    expect(updated!.address).toBe('New Address');
  });

  it('should delete a customer by id', async () => {
    const customer = await CustomerController.createCustomer('Delta LLC', 'Addr', '7778889999', '0001112222');
    const deleted = await CustomerController.deleteCustomer(customer.id);
    expect(deleted).toBe(true);
    const shouldBeNull = await CustomerController.updateCustomer(customer.id, { address: 'Should not update' });
    expect(shouldBeNull).toBeNull();
  });
  it('should create a customer and store it', async () => {
    const customer = await CustomerController.createCustomer('Acme Corp', '123 Main St', '1234567890', '0987654321');
    expect(customer.name).toBe('Acme Corp');
    const allCustomers = await CustomerController.getAllCustomers();
    expect(allCustomers.map(c => c.id)).toContain(customer.id);
  });

  it('should find customer by name', async () => {
    await CustomerController.createCustomer('Beta Inc', '456 Side St', '1111111111', '2222222222');
    const found = await CustomerController.findCustomerByName('Beta Inc');
    expect(found.length).toBeGreaterThan(0);
    expect(found[0].name).toBe('Beta Inc');
  });
});
