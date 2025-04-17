# Customs Freight Company Backend

This project implements a backend system for a customs freight company, featuring:
- Vehicle, Employee, MechanicRepair, Customer, Shipment, and Trip management
- REST API using Express
- PostgreSQL database (via TypeORM)
- Docker Compose setup for easy development

## Getting Started

### Prerequisites
- Docker and Docker Compose installed

### 1. Build and Start the App and Database
```sh
docker compose up --build
```
The backend will be available at `http://localhost:3000`.

### 2. Run Database Migrations (Create Tables)
In another terminal (while containers are running), run:

```sh
docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
```

This command creates or updates the database tables using the latest migration script.

### 3. Seed the Database with Sample Data (Insert Data)
After running migrations, insert sample data by running:

```sh
docker compose exec app npx ts-node src/seed.ts
```

This command populates the tables with sample vehicles, employees, customers, shipments, repairs, and trips. Run this step after migrations to have data available for testing the API or using Postman.

### 4. Test the API Endpoints
- Import `CustomsFreightCompany.postman_collection.json` into Postman.
- Each entity (Vehicle, Employee, Customer, Shipment, MechanicRepair, Trip) is organized in a folder, and requests are ordered as Create, Read, Update, Delete (CRUD).
- Use the provided sample requests and payloads to test all endpoints.
- Ensure the backend is running at `http://localhost:3000`.

### 5. Running Tests Locally
**Important:** To run tests, you must ensure that the required environment variables (such as `DATABASE_URL`) are available to your test process. Jest does not automatically load variables from `.env` or `.env.test` files.

**Recommended:**
- Use this command to export variables from `.env.test` (or `.env`) and run your tests:
  ```sh
  export $(cat .env.test | grep -v '^#' | xargs) && npm test
  ```
  Or, if you use `.env`:
  ```sh
  export $(cat .env | grep -v '^#' | xargs) && npm test
  ```
- This ensures all environment variables are available for your test runs.

**Why?**
If you see errors like `DATABASE_URL environment variable is not set`, it means the environment variables were not loaded.

### API Endpoints (CRUD Example)
- `POST /vehicles`, `GET /vehicles`, `PATCH /vehicles/:id`, `DELETE /vehicles/:id`
- `POST /employees`, `GET /employees`, `PATCH /employees/:id`, `DELETE /employees/:id`, `GET /mechanics`
- `POST /repairs`, `GET /repairs`, `PATCH /repairs/:id`, `DELETE /repairs/:id`
- `POST /customers`, `GET /customers`, `PATCH /customers/:id`, `DELETE /customers/:id`
- `POST /shipments`, `GET /shipments`, `PATCH /shipments/:id`, `DELETE /shipments/:id`
- `POST /trips`, `GET /trips`, `PATCH /trips/:id`, `DELETE /trips/:id`

### Development
- Source code: `src/`
- Tests: `src/__tests__/`

### Database
- TypeORM is used for ORM. Entities are defined in `src/entities/`.
- Database connection is configured via `src/ormconfig.ts` and `.env`/`docker-compose.yml`.

### Notes
- Ensure you have a `.env` file with correct DB credentials for local development.
- To stop the app, press `Ctrl+C` in the terminal running Docker Compose.

---

## Quick Reference: Common Commands

- **Build & Start:**
  ```sh
  docker compose up --build
  ```
- **Run Migrations:**
  ```sh
  docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
  ```
- **Stop Containers:**
  ```sh
  docker compose down
  ```

---

## Project Structure
- `src/controllers/` – API controllers
- `src/entities/` – TypeORM entity definitions
- `src/__tests__/` – Tests
- `docker-compose.yml` – Docker setup
- `.env` – Environment variables

---
- **Migrations:**
  - To generate a new migration:
    ```sh
    docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:generate src/migrations/NameOfMigration -d src/ormconfig.ts
    ```
  - To run migrations:
    ```sh
    docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
    ```

### Running Tests
```sh
npm install
npm test
```

---

For any questions or improvements, open an issue or PR.
