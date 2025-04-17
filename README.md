# Customs Freight Company Backend

## Quick Start

1. **Start the app and database:**
   ```sh
   docker compose up --build
   ```

2. **Run migrations (create tables):**
   ```sh
   docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
   ```

3. **Seed the database (insert sample data):**
   ```sh
   docker compose exec app npx ts-node src/seed.ts
   ```

4. **Test the API:**
   - Import `CustomsFreightCompany.postman_collection.json` into Postman and use the requests.

5. **Stop Containers:**
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
