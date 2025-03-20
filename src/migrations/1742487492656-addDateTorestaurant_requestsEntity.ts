import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateTorestaurantRequestsentity1742487492656 implements MigrationInterface {
    name = 'AddDateTorestaurantRequests.entity1742487492656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "createdAt"`);
    }

}
