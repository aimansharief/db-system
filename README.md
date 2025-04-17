# Customs Freight Company Backend

## Local Development (No Docker)

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Build the project**
   ```sh
   npm run build
   ```

3. **Configure your database**
   - Ensure PostgreSQL is running locally and `.env` has correct DB credentials.

4. **Run migrations (create tables)**
   ```sh
   npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
   ```

5. **Seed the database (insert sample data)**
   ```sh
   npx ts-node src/seed.ts
   ```

6. **Run tests**
   ```sh
   npm test
   ```

7. **Start the server**
   ```sh
   npm start
   ```

8. **Test the API**
   - Import `CustomsFreightCompany.postman_collection.json` into Postman and use the requests.

---

## Docker Development (Alternative)

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

4. **Run tests (in your local shell):**
   ```sh
   npm install
   npm test
   ```

5. **Test the API:**
   - Import `CustomsFreightCompany.postman_collection.json` into Postman and use the requests.

6. **Stop Containers:**
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

## How to Build and Test

1. **Build and start the app and database**
   ```sh
   docker compose up --build
   ```

2. **Run migrations (create tables)**
   ```sh
   docker compose exec app npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/ormconfig.ts
   ```

3. **Seed the database (insert sample data)**
   ```sh
   docker compose exec app npx ts-node src/seed.ts
   ```

4. **Run tests** (ensure the codebase is working before using the API)
   ```sh
   npm install
   npm test
   ```

5. **Test the API**
   - Import `CustomsFreightCompany.postman_collection.json` into Postman and use the requests.

6. **Stop containers**
   ```sh
   docker compose down
   ```

---

For any questions or improvements, open an issue or PR.
