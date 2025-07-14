import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBaseTable1752491304384 implements MigrationInterface {
  name = 'InitBaseTable1752491304384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "commodity_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_17d7b76e3354d6c4df5f7dc93a1" UNIQUE ("name"), CONSTRAINT "PK_0a5f6fe6bd4cd2c70690822cf53" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "commodities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "typeId" uuid, CONSTRAINT "PK_d8ec0122a7596e8b1b0a275c9c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."administrator_role_enum" AS ENUM('SUPERADMIN', 'STAFF', 'TECHNICAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "administrator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."administrator_role_enum" NOT NULL DEFAULT 'SUPERADMIN', CONSTRAINT "UQ_be0ce9bef56d5a30b9e57525643" UNIQUE ("email"), CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_histories_status_enum" AS ENUM('PENDING_VERIFICATION', 'PROCESSED', 'SHIPPED', 'COMPLETED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" "public"."order_histories_status_enum" NOT NULL DEFAULT 'PENDING_VERIFICATION', "notes" text, "orderId" uuid, "updatedById" uuid, CONSTRAINT "PK_580471ac7bdbe26a80ca6f5b7e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "full_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174" UNIQUE ("phone"), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_status" AS ENUM('PENDING_VERIFICATION', 'PROCESSED', 'SHIPPED', 'COMPLETED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "total" numeric(10,2) NOT NULL, "unit" character varying NOT NULL, "status" "public"."order_status" NOT NULL DEFAULT 'PENDING_VERIFICATION', "customerId" uuid, "commoditiesId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "commodities" ADD CONSTRAINT "FK_96f433be54825f2cb16b9025bae" FOREIGN KEY ("typeId") REFERENCES "commodity_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_histories" ADD CONSTRAINT "FK_623dbc91c4a74b8540e877e195a" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_histories" ADD CONSTRAINT "FK_5f3a6135df8a6573bd360cc5c20" FOREIGN KEY ("updatedById") REFERENCES "administrator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_734189b65c277b4b8f86b9d9c37" FOREIGN KEY ("commoditiesId") REFERENCES "commodities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_734189b65c277b4b8f86b9d9c37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_histories" DROP CONSTRAINT "FK_5f3a6135df8a6573bd360cc5c20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_histories" DROP CONSTRAINT "FK_623dbc91c4a74b8540e877e195a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commodities" DROP CONSTRAINT "FK_96f433be54825f2cb16b9025bae"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."order_status"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "order_histories"`);
    await queryRunner.query(`DROP TYPE "public"."order_histories_status_enum"`);
    await queryRunner.query(`DROP TABLE "administrator"`);
    await queryRunner.query(`DROP TYPE "public"."administrator_role_enum"`);
    await queryRunner.query(`DROP TABLE "commodities"`);
    await queryRunner.query(`DROP TABLE "commodity_types"`);
  }
}
