import { MigrationInterface, QueryRunner } from "typeorm";

export class StatutCmd1743955643959 implements MigrationInterface {
    name = 'StatutCmd1743955643959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" DROP COLUMN "isDelivered"`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD "livraison" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP COLUMN "statut"`);
        await queryRunner.query(`CREATE TYPE "public"."commandes_statut_enum" AS ENUM('en_attente', 'en_cours', 'prête', 'livrée', 'annulée', 'échouée')`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD "statut" "public"."commandes_statut_enum" NOT NULL DEFAULT 'en_attente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" DROP COLUMN "statut"`);
        await queryRunner.query(`DROP TYPE "public"."commandes_statut_enum"`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD "statut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP COLUMN "livraison"`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD "isDelivered" boolean NOT NULL`);
    }

}
