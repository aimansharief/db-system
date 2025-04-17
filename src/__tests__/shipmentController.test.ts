import { VehicleType } from '../entities/Vehicle';
import request from 'supertest';
import app from '../index';
import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { ShipmentController } from '../controllers/ShipmentController';

describe('ShipmentController', () => {
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
  it('should update a shipment destination', async () => {
    const shipment = await ShipmentController.createShipment(999, 8888, 3, 'OriginZ', 'DestZ', ['cargo_plane']);
    const updated = await ShipmentController.updateShipment(shipment.id, { destination: 'DestUpdated' });
    expect(updated).not.toBeNull();
    expect(updated!.destination).toBe('DestUpdated');
  });

  it('should delete a shipment by id', async () => {
    const shipment = await ShipmentController.createShipment(111, 222, 4, 'O', 'D', ['long_haul_truck']);
    const deleted = await ShipmentController.deleteShipment(shipment.id);
    expect(deleted).toBe(true);
    const shouldBeNull = await ShipmentController.updateShipment(shipment.id, { destination: 'ShouldNotUpdate' });
    expect(shouldBeNull).toBeNull();
  });
  it('should create a shipment and store it', async () => {
    const shipment = await ShipmentController.createShipment(500, 10000, 1, 'Warehouse A', 'Warehouse B', ['cargo_plane', 'long_haul_truck']);
    expect(shipment.origin).toBe('Warehouse A');
    const allShipments = await ShipmentController.getAllShipments();
    expect(allShipments.map(s => s.id)).toContain(shipment.id);
  });

  it('should get shipments by customer', async () => {
    await ShipmentController.createShipment(200, 4000, 2, 'Warehouse X', 'Warehouse Y', ['in_city_truck']);
    const shipments = await ShipmentController.getShipmentsByCustomer(2);
    expect(shipments.length).toBeGreaterThan(0);
    expect(shipments[0].customerId).toBe(2);
  });
});
