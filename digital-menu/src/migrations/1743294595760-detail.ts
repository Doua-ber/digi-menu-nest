import { MigrationInterface, QueryRunner } from "typeorm";

export class Detail1743294595760 implements MigrationInterface {
    name = 'Detail1743294595760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "details" DROP COLUMN "totalLigne"`);
        await queryRunner.query(`ALTER TABLE "details" ADD "totalLigne" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "details" DROP COLUMN "totalLigne"`);
        await queryRunner.query(`ALTER TABLE "details" ADD "totalLigne" integer`);
    }

}
