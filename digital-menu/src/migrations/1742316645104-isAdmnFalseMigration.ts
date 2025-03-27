import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdmnFalseMigration1742316645104 implements MigrationInterface {
    name = 'IsAdmnFalseMigration1742316645104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "prenomnnnnn" TO "prenom"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "prenom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "prenom" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "prenom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "prenom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "prenom" TO "prenomnnnnn"`);
    }

}
