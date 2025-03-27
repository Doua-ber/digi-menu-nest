import { MigrationInterface, QueryRunner } from "typeorm";

export class AddValidateDateTorestaurantRequestsEntity1742488521622 implements MigrationInterface {
    name = 'AddValidateDateTorestaurantRequestsEntity1742488521622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "validatedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "validatedAt"`);
    }

}
