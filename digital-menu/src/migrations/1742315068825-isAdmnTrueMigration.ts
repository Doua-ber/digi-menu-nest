import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdmnTrueMigration1742315068825 implements MigrationInterface {
    name = 'IsAdmnTrueMigration1742315068825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

}
