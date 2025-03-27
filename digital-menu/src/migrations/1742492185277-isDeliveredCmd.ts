import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDeliveredCmd1742492185277 implements MigrationInterface {
    name = 'IsDeliveredCmd1742492185277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" RENAME COLUMN "livraison" TO "isDelivered"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" RENAME COLUMN "isDelivered" TO "livraison"`);
    }

}
