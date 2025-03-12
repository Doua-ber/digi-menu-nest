import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionMigration1741638937245 implements MigrationInterface {
    name = 'RolePermissionMigration1741638937245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleAr" TO "titleArb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "titleArb" TO "titleAr"`);
    }

}
