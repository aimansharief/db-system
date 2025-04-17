import { describe, it, expect } from '@jest/globals';

import { CargoPlane, InCityTruck, LongHaulTruck } from '../entities/Vehicle';
import { Employee } from '../entities/Employee';
import { MechanicRepair } from '../entities/MechanicRepair';
import { Customer } from '../entities/Customer';
import { Shipment } from '../entities/Shipment';
import { Trip } from '../entities/Trip';

describe('Vehicle Entity', () => {
  it('should create a Cargo Plane with correct attributes', () => {
    // TODO: Replace with actual Vehicle class and instantiation
    const cargoPlane = new CargoPlane();
    cargoPlane.brand = 'Boeing';
    cargoPlane.type = 'cargo_plane';
    cargoPlane.load = 10000;
    cargoPlane.capacity = 50000;
    cargoPlane.year = 2020;
    cargoPlane.numberOfRepairs = 2;
    expect(cargoPlane.brand).toBe('Boeing');
    expect(cargoPlane.type).toBe('cargo_plane');
  });

  it('should create an In-city Truck with correct attributes', () => {
    const truck = new InCityTruck();
    truck.brand = 'Tata';
    truck.type = 'in_city_truck';
    truck.load = 2000;
    truck.capacity = 8000;
    truck.year = 2022;
    truck.numberOfRepairs = 1;
    expect(truck.type).toBe('in_city_truck');
  });

  it('should create a Long Haul Truck with correct attributes', () => {
    const truck = new LongHaulTruck();
    truck.brand = 'Volvo';
    truck.type = 'long_haul_truck';
    truck.load = 5000;
    truck.capacity = 20000;
    truck.year = 2021;
    truck.numberOfRepairs = 0;
    expect(truck.type).toBe('long_haul_truck');
  });
});

describe('Employee Entity', () => {
  it('should create an employee with certifications', () => {
    const employee = new Employee();
    employee.name = 'John';
    employee.surname = 'Doe';
    employee.seniority = 5;
    employee.certifications = ['cargo_plane', 'in_city_truck'];
    employee.isMechanic = true;
    expect(employee.certifications).toContain('cargo_plane');
    expect(employee.isMechanic).toBe(true);
  });
});

describe('MechanicRepair Entity', () => {
  it('should record a mechanic repair with estimated and actual time', () => {
    const repair = new MechanicRepair();
    repair.vehicleId = 1;
    repair.mechanicId = 2;
    repair.estimatedDays = 3;
    repair.actualDays = 4;
    expect(repair.estimatedDays).toBe(3);
    expect(repair.actualDays).toBe(4);
  });
});

describe('Customer Entity', () => {
  it('should create a customer with two phone numbers', () => {
    const customer = new Customer();
    customer.name = 'Acme Corp';
    customer.address = '123 Main St';
    customer.phone1 = '1234567890';
    customer.phone2 = '0987654321';
    expect(customer.phone1).not.toBe(customer.phone2);
  });
});

describe('Shipment Entity', () => {
  it('should create a shipment linked to a customer and route', () => {
    const shipment = new Shipment();
    shipment.weight = 500;
    shipment.value = 10000;
    shipment.customerId = 1;
    shipment.origin = 'Warehouse A';
    shipment.destination = 'Warehouse B';
    shipment.route = ['cargo_plane', 'long_haul_truck'];
    expect(shipment.route.length).toBeGreaterThan(0);
  });
});

describe('Trip Entity', () => {
  it('should create a trip with up to two drivers and multiple shipments', () => {
    const trip = new Trip();
    trip.vehicleId = 1;
    trip.from = 'Warehouse A';
    trip.to = 'Warehouse B';
    trip.drivers = [1, 2];
    trip.shipments = [1, 2, 3];
    expect(trip.drivers.length).toBeLessThanOrEqual(2);
    expect(trip.shipments.length).toBeGreaterThan(0);
  });
});
