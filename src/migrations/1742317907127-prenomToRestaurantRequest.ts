import { MigrationInterface, QueryRunner } from "typeorm";

export class PrenomToRestaurantRequest1742317907127 implements MigrationInterface {
    name = 'PrenomToRestaurantRequest1742317907127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "prenom" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "prenom"`);
    }

}
