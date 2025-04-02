import { MigrationInterface, QueryRunner } from "typeorm";

export class IngredientDetail1743278874659 implements MigrationInterface {
    name = 'IngredientDetail1743278874659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "details" ("id" SERIAL NOT NULL, "quantite" integer NOT NULL, "totalLigne" integer, "commandeId" integer, "produitId" integer, CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produit_ingredient" ("produitId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_8639d6dcb5d6b264b703e0c937d" PRIMARY KEY ("produitId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_02edf02bcc2755ae875b9e4b45" ON "produit_ingredient" ("produitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d65cf489034940314c27730c54" ON "produit_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "details" ADD CONSTRAINT "FK_13aeb0238c0ac150ddaa757333b" FOREIGN KEY ("commandeId") REFERENCES "commandes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "details" ADD CONSTRAINT "FK_188cc964f68b0f14390654d31a3" FOREIGN KEY ("produitId") REFERENCES "produits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produit_ingredient" ADD CONSTRAINT "FK_02edf02bcc2755ae875b9e4b459" FOREIGN KEY ("produitId") REFERENCES "produits"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produit_ingredient" ADD CONSTRAINT "FK_d65cf489034940314c27730c546" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produit_ingredient" DROP CONSTRAINT "FK_d65cf489034940314c27730c546"`);
        await queryRunner.query(`ALTER TABLE "produit_ingredient" DROP CONSTRAINT "FK_02edf02bcc2755ae875b9e4b459"`);
        await queryRunner.query(`ALTER TABLE "details" DROP CONSTRAINT "FK_188cc964f68b0f14390654d31a3"`);
        await queryRunner.query(`ALTER TABLE "details" DROP CONSTRAINT "FK_13aeb0238c0ac150ddaa757333b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d65cf489034940314c27730c54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02edf02bcc2755ae875b9e4b45"`);
        await queryRunner.query(`DROP TABLE "produit_ingredient"`);
        await queryRunner.query(`DROP TABLE "details"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
