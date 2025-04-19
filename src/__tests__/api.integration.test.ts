import request from 'supertest';
import express from 'express';
import { TestDataSource } from './test-data-source';

// Import controllers
import { VehicleController } from '../controllers/VehicleController';
import { EmployeeController } from '../controllers/EmployeeController';
import { CustomerController } from '../controllers/CustomerController';
import { ShipmentController } from '../controllers/ShipmentController';
import { MechanicRepairController } from '../controllers/MechanicRepairController';
import { TripController } from '../controllers/TripController';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

const app = express();
app.use(express.json());

// Vehicle endpoints
app.post('/vehicles', async (req, res) => {
  try {
    const { type, brand, load, capacity, year, numberOfRepairs } = req.body;
    const vehicle = await VehicleController.createVehicle(type, brand, load, capacity, year, numberOfRepairs);
    res.status(201).json(vehicle);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
app.get('/vehicles', async (req, res) => {
  const vehicles = await VehicleController.getAllVehicles();
  res.json(vehicles);
});
app.patch('/vehicles/:id', async (req, res) => {
  const updated = await VehicleController.updateVehicle(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/vehicles/:id', async (req, res) => {
  const deleted = await VehicleController.deleteVehicle(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

// Employee endpoints
app.post('/employees', async (req, res) => {
  const { name, surname, seniority, certifications, isMechanic } = req.body;
  const employee = await EmployeeController.createEmployee(name, surname, seniority, certifications, isMechanic);
  res.status(201).json(employee);
});
app.get('/employees', async (req, res) => {
  const employees = await EmployeeController.getAllEmployees();
  res.json(employees);
});
app.get('/mechanics', async (req, res) => {
  const mechanics = await EmployeeController.getMechanics();
  res.json(mechanics);
});
app.patch('/employees/:id', async (req, res) => {
  const updated = await EmployeeController.updateEmployee(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/employees/:id', async (req, res) => {
  const deleted = await EmployeeController.deleteEmployee(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

// Customer endpoints
app.post('/customers', async (req, res) => {
  const { name, address, phone1, phone2 } = req.body;
  const customer = await CustomerController.createCustomer(name, address, phone1, phone2);
  res.status(201).json(customer);
});
app.get('/customers', async (req, res) => {
  const customers = await CustomerController.getAllCustomers();
  res.json(customers);
});
app.patch('/customers/:id', async (req, res) => {
  const updated = await CustomerController.updateCustomer(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/customers/:id', async (req, res) => {
  const deleted = await CustomerController.deleteCustomer(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

// Shipment endpoints
app.post('/shipments', async (req, res) => {
  const { weight, value, customerId, origin, destination, route } = req.body;
  const shipment = await ShipmentController.createShipment(weight, value, customerId, origin, destination, route);
  res.status(201).json(shipment);
});
app.get('/shipments', async (req, res) => {
  const shipments = await ShipmentController.getAllShipments();
  res.json(shipments);
});
app.patch('/shipments/:id', async (req, res) => {
  const updated = await ShipmentController.updateShipment(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/shipments/:id', async (req, res) => {
  const deleted = await ShipmentController.deleteShipment(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

// MechanicRepair endpoints
app.post('/repairs', async (req, res) => {
  const { vehicleId, mechanicId, estimatedDays, actualDays } = req.body;
  const repair = await MechanicRepairController.recordRepair(vehicleId, mechanicId, estimatedDays, actualDays);
  res.status(201).json(repair);
});
app.get('/repairs', async (req, res) => {
  const repairs = await MechanicRepairController.getAllRepairs();
  res.json(repairs);
});
app.patch('/repairs/:id', async (req, res) => {
  const updated = await MechanicRepairController.updateRepair(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/repairs/:id', async (req, res) => {
  const deleted = await MechanicRepairController.deleteRepair(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

// Trip endpoints
app.post('/trips', async (req, res) => {
  const { vehicleId, from, to, drivers, shipments } = req.body;
  const trip = await TripController.createTrip(vehicleId, from, to, drivers, shipments);
  res.status(201).json(trip);
});
app.get('/trips', async (req, res) => {
  const trips = await TripController.getAllTrips();
  res.json(trips);
});
app.patch('/trips/:id', async (req, res) => {
  const updated = await TripController.updateTrip(Number(req.params.id), req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Not found' });
});
app.delete('/trips/:id', async (req, res) => {
  const deleted = await TripController.deleteTrip(Number(req.params.id));
  if (deleted) res.json({ deleted: true });
  else res.status(404).json({ error: 'Not found' });
});

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

describe('API Integration Tests', () => {
  // Add a basic test for each endpoint here. For brevity, only one happy-path test per resource is shown.

  let vehicleId: number;
  let employeeId: number;
  let customerId: number;
  let shipmentId: number;
  let repairId: number;
  let tripId: number;

  it('should create a vehicle', async () => {
    const res = await request(app).post('/vehicles').send({
      type: 'cargo_plane', brand: 'Boeing', load: 10000, capacity: 50000, year: 2020, numberOfRepairs: 2
    });
    expect(res.status).toBe(201);
    vehicleId = res.body.id;
  });

  it('should get all vehicles', async () => {
    const res = await request(app).get('/vehicles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a vehicle', async () => {
    const res = await request(app).patch(`/vehicles/${vehicleId}`).send({ brand: 'UpdatedBrand' });
    expect(res.status).toBe(200);
    expect(res.body.brand).toBe('UpdatedBrand');
  });

  it('should delete a vehicle', async () => {
    const res = await request(app).delete(`/vehicles/${vehicleId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('should create an employee', async () => {
    const res = await request(app).post('/employees').send({
      name: 'John', surname: 'Doe', seniority: 5, certifications: ['cargo_plane'], isMechanic: true
    });
    expect(res.status).toBe(201);
    employeeId = res.body.id;
  });

  it('should get all employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get mechanics', async () => {
    const res = await request(app).get('/mechanics');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update an employee', async () => {
    const res = await request(app).patch(`/employees/${employeeId}`).send({ surname: 'UpdatedSurname' });
    expect(res.status).toBe(200);
    expect(res.body.surname).toBe('UpdatedSurname');
  });

  it('should delete an employee', async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('should create a customer', async () => {
    const res = await request(app).post('/customers').send({
      name: 'Acme Corp', address: '123 Main St', phone1: '1234567890', phone2: '0987654321'
    });
    expect(res.status).toBe(201);
    customerId = res.body.id;
  });

  it('should get all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a customer', async () => {
    const res = await request(app).patch(`/customers/${customerId}`).send({ address: 'New Address' });
    expect(res.status).toBe(200);
    expect(res.body.address).toBe('New Address');
  });

  it('should delete a customer', async () => {
    const res = await request(app).delete(`/customers/${customerId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('should create a shipment', async () => {
    // Need a customer for shipment
    const custRes = await request(app).post('/customers').send({
      name: 'ShipmentCo', address: '456 Side St', phone1: '1111111111', phone2: '2222222222'
    });
    const custId = custRes.body.id;
    const res = await request(app).post('/shipments').send({
      weight: 500, value: 10000, customerId: custId, origin: 'Warehouse A', destination: 'Warehouse B', route: ['cargo_plane']
    });
    expect(res.status).toBe(201);
    shipmentId = res.body.id;
  });

  it('should get all shipments', async () => {
    const res = await request(app).get('/shipments');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a shipment', async () => {
    const res = await request(app).patch(`/shipments/${shipmentId}`).send({ destination: 'Warehouse C' });
    expect(res.status).toBe(200);
    expect(res.body.destination).toBe('Warehouse C');
  });

  it('should delete a shipment', async () => {
    const res = await request(app).delete(`/shipments/${shipmentId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('should create a mechanic repair', async () => {
    // Need vehicle and mechanic
    const vRes = await request(app).post('/vehicles').send({
      type: 'in_city_truck', brand: 'Tata', load: 2000, capacity: 8000, year: 2022, numberOfRepairs: 1
    });
    const vehicleId = vRes.body.id;
    const eRes = await request(app).post('/employees').send({
      name: 'Mechanic', surname: 'Smith', seniority: 10, certifications: ['in_city_truck'], isMechanic: true
    });
    const mechanicId = eRes.body.id;
    const res = await request(app).post('/repairs').send({
      vehicleId, mechanicId, estimatedDays: 5, actualDays: 6
    });
    expect(res.status).toBe(201);
    repairId = res.body.id;
  });

  it('should get all repairs', async () => {
    const res = await request(app).get('/repairs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a repair', async () => {
    const res = await request(app).patch(`/repairs/${repairId}`).send({ actualDays: 10 });
    expect(res.status).toBe(200);
    expect(res.body.actualDays).toBe(10);
  });

  it('should delete a repair', async () => {
    const res = await request(app).delete(`/repairs/${repairId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('should create a trip', async () => {
    // Need vehicle, driver, shipment
    const vRes = await request(app).post('/vehicles').send({
      type: 'long_haul_truck', brand: 'Volvo', load: 5000, capacity: 20000, year: 2021, numberOfRepairs: 0
    });
    const vehicleId = vRes.body.id;
    const eRes = await request(app).post('/employees').send({
      name: 'Driver', surname: 'Lee', seniority: 3, certifications: ['long_haul_truck'], isMechanic: false
    });
    const driverId = eRes.body.id;
    const sRes = await request(app).post('/shipments').send({
      weight: 1000, value: 20000, customerId: 1, origin: 'Start', destination: 'End', route: ['long_haul_truck']
    });
    const shipmentId = sRes.body.id;
    const res = await request(app).post('/trips').send({
      vehicleId, from: 'Start', to: 'End', drivers: [driverId], shipments: [shipmentId]
    });
    expect(res.status).toBe(201);
    tripId = res.body.id;
  });

  it('should get all trips', async () => {
    const res = await request(app).get('/trips');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a trip', async () => {
    const res = await request(app).patch(`/trips/${tripId}`).send({ to: 'NewEnd' });
    expect(res.status).toBe(200);
    expect(res.body.to).toBe('NewEnd');
  });

  it('should delete a trip', async () => {
    const res = await request(app).delete(`/trips/${tripId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });
});
