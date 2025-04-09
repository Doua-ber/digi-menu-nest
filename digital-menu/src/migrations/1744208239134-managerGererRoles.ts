import { MigrationInterface, QueryRunner } from "typeorm";

export class ManagerGererRoles1744208239134 implements MigrationInterface {
    name = 'ManagerGererRoles1744208239134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "restaurantId" integer`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_26ae127831db66753dbfc4eb961" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_26ae127831db66753dbfc4eb961"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "restaurantId"`);
    }

}
