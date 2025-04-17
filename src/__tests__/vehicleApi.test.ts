import 'reflect-metadata';
import dotenv from 'dotenv';
// Prefer .env.test for test runs, fallback to .env
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}
import request from 'supertest';
import express from 'express';
jest.setTimeout(30000);
import { TestDataSource } from './test-data-source';

jest.mock('../ormconfig', () => ({
  AppDataSource: TestDataSource,
}));

import { VehicleController } from '../controllers/VehicleController';

const app = express();
app.use(express.json());

app.post('/vehicles', async (req, res) => {
  try {
    const { type, brand, load, capacity, year, numberOfRepairs } = req.body;
    const vehicle = await VehicleController.createVehicle(type, brand, load, capacity, year, numberOfRepairs);
    res.status(201).json(vehicle);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
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

describe('POST /vehicles', () => {
  it('should create a vehicle and return it', async () => {
    const res = await request(app)
      .post('/vehicles')
      .send({
        type: 'cargo_plane',
        brand: 'Boeing',
        load: 10000,
        capacity: 50000,
        year: 2020,
        numberOfRepairs: 2
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.brand).toBe('Boeing');
    expect(res.body.type).toBe('cargo_plane');
  });
});
