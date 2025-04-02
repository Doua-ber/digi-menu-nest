import { MigrationInterface, QueryRunner } from "typeorm";

export class Ingredient1743279954560 implements MigrationInterface {
    name = 'Ingredient1743279954560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "nomEng" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "nomAr" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "disponibilite" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "disponibilite"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "nomAr"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "nomEng"`);
    }

}
