import { MigrationInterface, QueryRunner } from "typeorm";

export class ManagerAdminChildMigration1742320703378 implements MigrationInterface {
    name = 'ManagerAdminChildMigration1742320703378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOwner" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOwner"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
