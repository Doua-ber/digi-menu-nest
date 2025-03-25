import { MigrationInterface, QueryRunner } from "typeorm";

export class ProduitRubrique1742684429241 implements MigrationInterface {
    name = 'ProduitRubrique1742684429241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produits" ADD "descEng" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produits" ADD "descAr" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produits" DROP COLUMN "descAr"`);
        await queryRunner.query(`ALTER TABLE "produits" DROP COLUMN "descEng"`);
    }

}
