import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderTable1752569525935 implements MigrationInterface {
  name = 'AlterOrderTable1752569525935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "whatsapp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_17f5e142323073a3c507bbe207c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "orderCode" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderCode"`);
    await queryRunner.query(`DROP TABLE "whatsapp"`);
  }
}
