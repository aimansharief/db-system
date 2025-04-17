import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './ormconfig';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Health check endpoint for diagnostics
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    // Import controllers and register routes ONLY after DB is ready
    const { VehicleController } = require('./controllers/VehicleController');
    app.post('/vehicles', async (req, res) => {
      try {
        const { type, brand, load, capacity, year, numberOfRepairs } = req.body;
        const vehicle = await VehicleController.createVehicle(type, brand, load, capacity, year, numberOfRepairs);
        res.status(201).json(vehicle);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.get('/vehicles', async (req, res) => {
      try {
        const vehicles = await VehicleController.getAllVehicles();
        res.json(vehicles);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    app.patch('/vehicles/:id', async (req, res) => {
      try {
        const updated = await VehicleController.updateVehicle(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ error: 'Vehicle not found' });
        res.json(updated);
      } catch (e) {
        res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
      }
    });

    app.delete('/vehicles/:id', async (req, res) => {
      try {
        const deleted = await VehicleController.deleteVehicle(Number(req.params.id));
        if (!deleted) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(204).send();
      } catch (e) {
        res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
      }
    });

    const { EmployeeController } = require('./controllers/EmployeeController');
    app.post('/employees', async (req, res) => {
      try {
        const { name, surname, seniority, certifications, isMechanic } = req.body;
        const employee = await EmployeeController.createEmployee(name, surname, seniority, certifications, isMechanic);
        res.status(201).json(employee);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.patch('/employees/:id', async (req, res) => {
  try {
    const updated = await EmployeeController.updateEmployee(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.delete('/employees/:id', async (req, res) => {
  try {
    const deleted = await EmployeeController.deleteEmployee(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.get('/employees', async (req, res) => {
      try {
        const employees = await EmployeeController.getAllEmployees();
        res.json(employees);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });
    app.get('/mechanics', async (req, res) => {
      try {
        const mechanics = await EmployeeController.getMechanics();
        res.json(mechanics);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    const { MechanicRepairController } = require('./controllers/MechanicRepairController');
    app.post('/repairs', async (req, res) => {
      try {
        const { vehicleId, mechanicId, estimatedDays, actualDays } = req.body;
        const repair = await MechanicRepairController.recordRepair(vehicleId, mechanicId, estimatedDays, actualDays);
        res.status(201).json(repair);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.patch('/repairs/:id', async (req, res) => {
  try {
    const updated = await MechanicRepairController.updateRepair(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Repair not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.delete('/repairs/:id', async (req, res) => {
  try {
    const deleted = await MechanicRepairController.deleteRepair(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Repair not found' });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.get('/repairs', async (req, res) => {
      try {
        const repairs = await MechanicRepairController.getAllRepairs();
        res.json(repairs);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    const { CustomerController } = require('./controllers/CustomerController');
    app.post('/customers', async (req, res) => {
      try {
        const { name, address, phone1, phone2 } = req.body;
        const customer = await CustomerController.createCustomer(name, address, phone1, phone2);
        res.status(201).json(customer);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.patch('/customers/:id', async (req, res) => {
  try {
    const updated = await CustomerController.updateCustomer(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Customer not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.delete('/customers/:id', async (req, res) => {
  try {
    const deleted = await CustomerController.deleteCustomer(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.get('/customers', async (req, res) => {
      try {
        const customers = await CustomerController.getAllCustomers();
        res.json(customers);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    const { ShipmentController } = require('./controllers/ShipmentController');
    app.post('/shipments', async (req, res) => {
      try {
        const { weight, value, customerId, origin, destination, route } = req.body;
        const shipment = await ShipmentController.createShipment(weight, value, customerId, origin, destination, route);
        res.status(201).json(shipment);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.patch('/shipments/:id', async (req, res) => {
  try {
    const updated = await ShipmentController.updateShipment(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Shipment not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.delete('/shipments/:id', async (req, res) => {
  try {
    const deleted = await ShipmentController.deleteShipment(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Shipment not found' });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.get('/shipments', async (req, res) => {
      try {
        const shipments = await ShipmentController.getAllShipments();
        res.json(shipments);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    const { TripController } = require('./controllers/TripController');
    app.post('/trips', async (req, res) => {
      try {
        const { vehicleId, from, to, drivers, shipments } = req.body;
        const trip = await TripController.createTrip(vehicleId, from, to, drivers, shipments);
        res.status(201).json(trip);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
        } else {
            res.status(400).json({ error: String(e) });
        }
      }
    });
    app.patch('/trips/:id', async (req, res) => {
  try {
    const updated = await TripController.updateTrip(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Trip not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.delete('/trips/:id', async (req, res) => {
  try {
    const deleted = await TripController.deleteTrip(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Trip not found' });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : String(e) });
  }
});
app.get('/trips', async (req, res) => {
      try {
        const trips = await TripController.getAllTrips();
        res.json(trips);
      } catch (e) {
        if (e instanceof Error) {
                    res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: String(e) });
        }
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
    process.exit(1);
  });

export default app;
