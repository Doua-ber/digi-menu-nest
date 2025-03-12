import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminMigration1741731011720 implements MigrationInterface {
    name = 'AdminMigration1741731011720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
