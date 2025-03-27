import { MigrationInterface, QueryRunner } from "typeorm";

export class Rubrique1742694768927 implements MigrationInterface {
    name = 'Rubrique1742694768927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produits" DROP CONSTRAINT "FK_ce46efe1fd083e642c7dae356ef"`);
        await queryRunner.query(`ALTER TABLE "produits" RENAME COLUMN "rubriquesId" TO "rubriqueId"`);
        await queryRunner.query(`ALTER TABLE "produits" ADD CONSTRAINT "FK_6e56972aa191a9fd6e8d9c6a8c3" FOREIGN KEY ("rubriqueId") REFERENCES "rubriques"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produits" DROP CONSTRAINT "FK_6e56972aa191a9fd6e8d9c6a8c3"`);
        await queryRunner.query(`ALTER TABLE "produits" RENAME COLUMN "rubriqueId" TO "rubriquesId"`);
        await queryRunner.query(`ALTER TABLE "produits" ADD CONSTRAINT "FK_ce46efe1fd083e642c7dae356ef" FOREIGN KEY ("rubriquesId") REFERENCES "rubriques"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
