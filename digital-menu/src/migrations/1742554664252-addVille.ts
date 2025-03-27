import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVille1742554664252 implements MigrationInterface {
    name = 'AddVille1742554664252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."restaurants_ville_enum" AS ENUM('Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Nabeul', 'Bizerte', 'Tunis', 'Ariana', 'Manouba', 'Ben Arous', 'Kairouan', 'Gabès', 'Gafsa', 'Tataouine', 'Médenine', 'Tozeur', 'Kébili', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Zaghouan', 'Kasserine', 'Sidi Bouzid')`);
        await queryRunner.query(`ALTER TABLE "restaurants" ADD "ville" "public"."restaurants_ville_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."restaurant_requests_ville_enum" AS ENUM('Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Nabeul', 'Bizerte', 'Tunis', 'Ariana', 'Manouba', 'Ben Arous', 'Kairouan', 'Gabès', 'Gafsa', 'Tataouine', 'Médenine', 'Tozeur', 'Kébili', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Zaghouan', 'Kasserine', 'Sidi Bouzid')`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "ville" "public"."restaurant_requests_ville_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "ville"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_requests_ville_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "ville"`);
        await queryRunner.query(`DROP TYPE "public"."restaurants_ville_enum"`);
    }

}
