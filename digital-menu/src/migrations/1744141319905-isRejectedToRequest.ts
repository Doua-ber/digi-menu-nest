import { MigrationInterface, QueryRunner } from "typeorm";

export class IsRejectedToRequest1744141319905 implements MigrationInterface {
    name = 'IsRejectedToRequest1744141319905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants" RENAME COLUMN "ville" TO "gouvernorat"`);
        await queryRunner.query(`ALTER TYPE "public"."restaurants_ville_enum" RENAME TO "restaurants_gouvernorat_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "ville"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_requests_ville_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."restaurant_requests_gouvernorat_enum" AS ENUM('Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Nabeul', 'Bizerte', 'Tunis', 'Ariana', 'Manouba', 'Ben Arous', 'Kairouan', 'Gabès', 'Gafsa', 'Tataouine', 'Médenine', 'Tozeur', 'Kébili', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Zaghouan', 'Kasserine', 'Sidi Bouzid')`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "gouvernorat" "public"."restaurant_requests_gouvernorat_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "isRejected" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "isRejected"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "gouvernorat"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_requests_gouvernorat_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."restaurant_requests_ville_enum" AS ENUM('Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Nabeul', 'Bizerte', 'Tunis', 'Ariana', 'Manouba', 'Ben Arous', 'Kairouan', 'Gabès', 'Gafsa', 'Tataouine', 'Médenine', 'Tozeur', 'Kébili', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Zaghouan', 'Kasserine', 'Sidi Bouzid')`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "ville" "public"."restaurant_requests_ville_enum" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."restaurants_gouvernorat_enum" RENAME TO "restaurants_ville_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurants" RENAME COLUMN "gouvernorat" TO "ville"`);
    }

}
