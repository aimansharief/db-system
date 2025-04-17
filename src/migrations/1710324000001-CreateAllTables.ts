import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1710324000001 implements MigrationInterface {
    name = 'CreateAllTables1710324000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "vehicle" (
            "id" SERIAL PRIMARY KEY,
            "brand" VARCHAR NOT NULL,
            "load" FLOAT NOT NULL,
            "capacity" FLOAT NOT NULL,
            "year" INTEGER NOT NULL,
            "numberOfRepairs" INTEGER NOT NULL,
            "type" VARCHAR NOT NULL
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "employee" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "surname" VARCHAR NOT NULL,
            "seniority" INTEGER NOT NULL,
            -- For Postgres use VARCHAR[]; for SQLite use VARCHAR as comma-separated string
            "certifications" VARCHAR NOT NULL,
            "isMechanic" BOOLEAN NOT NULL
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "mechanic_repair" (
            "id" SERIAL PRIMARY KEY,
            "vehicleId" INTEGER NOT NULL REFERENCES vehicle(id),
            "mechanicId" INTEGER NOT NULL REFERENCES employee(id),
            "estimatedDays" INTEGER NOT NULL,
            "actualDays" INTEGER NOT NULL
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "customer" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "phone1" VARCHAR NOT NULL,
            "phone2" VARCHAR NOT NULL
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "shipment" (
            "id" SERIAL PRIMARY KEY,
            "weight" INTEGER NOT NULL,
            "value" INTEGER NOT NULL,
            "customerId" INTEGER NOT NULL REFERENCES customer(id),
            "origin" VARCHAR NOT NULL,
            "destination" VARCHAR NOT NULL,
            -- For Postgres use VARCHAR[]; for SQLite use VARCHAR as comma-separated string
            "route" VARCHAR NOT NULL
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "trip" (
            "id" SERIAL PRIMARY KEY,
            "vehicleId" INTEGER NOT NULL REFERENCES vehicle(id),
            "from" VARCHAR NOT NULL,
            "to" VARCHAR NOT NULL,
            -- For Postgres use INTEGER[]; for SQLite use VARCHAR as comma-separated string
            "drivers" VARCHAR NOT NULL,
            -- For Postgres use INTEGER[]; for SQLite use VARCHAR as comma-separated string
            "shipments" VARCHAR NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "trip"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "shipment"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "customer"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "mechanic_repair"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "employee"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "vehicle"`);
    }
}
