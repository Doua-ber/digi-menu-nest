import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionMigration1741638996176 implements MigrationInterface {
    name = 'RolePermissionMigration1741638996176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleArb" TO "titleAr"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleAr" TO "titleArb"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "titleArb"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "titleAr" character varying`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "titleArb" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "titleArb"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "titleAr"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "titleArb" character varying`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleArb" TO "titleAr"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleAr" TO "titleArb"`);
    }

}
