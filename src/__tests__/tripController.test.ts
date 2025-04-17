import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { TripController } from '../controllers/TripController';

describe('TripController', () => {
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
  it('should update a trip destination', async () => {
    const trip = await TripController.createTrip(5, 'FromA', 'ToA', [21], [201]);
    const updated = await TripController.updateTrip(trip.id, { to: 'ToUpdated' });
    expect(updated).not.toBeNull();
    expect(updated!.to).toBe('ToUpdated');
  });

  it('should delete a trip by id', async () => {
    const trip = await TripController.createTrip(6, 'FromB', 'ToB', [22], [202]);
    const deleted = await TripController.deleteTrip(trip.id);
    expect(deleted).toBe(true);
    const shouldBeNull = await TripController.updateTrip(trip.id, { to: 'ShouldNotUpdate' });
    expect(shouldBeNull).toBeNull();
  });
  it('should create a trip and store it', async () => {
    const trip = await TripController.createTrip(1, 'Warehouse A', 'Warehouse B', [10, 11], [100, 101]);
    expect(trip.from).toBe('Warehouse A');
    const allTrips = await TripController.getAllTrips();
    expect(allTrips.map(t => t.id)).toContain(trip.id);
  });

  it('should get trips by vehicle', async () => {
    await TripController.createTrip(2, 'Origin', 'Dest', [12], [102]);
    const trips = await TripController.getTripsByVehicle(2);
    expect(trips.length).toBeGreaterThan(0);
    expect(trips[0].vehicleId).toBe(2);
  });

  it('should get trips by driver', async () => {
    await TripController.createTrip(3, 'Start', 'End', [13], [103]);
    const trips = await TripController.getTripsByDriver(13);
    expect(trips.length).toBeGreaterThan(0);
    // SQLite simple-array returns array of strings; convert to number for assertion
    const driverIds = trips[0].drivers.map(Number);
    expect(driverIds).toContain(13);
  });
});
