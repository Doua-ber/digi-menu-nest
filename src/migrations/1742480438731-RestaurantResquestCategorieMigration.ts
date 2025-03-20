import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantResquestCategorieMigration1742480438731 implements MigrationInterface {
    name = 'RestaurantResquestCategorieMigration1742480438731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD "categorieId" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_60754fa3f3aaf631e3912956820" FOREIGN KEY ("categorieId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_60754fa3f3aaf631e3912956820"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP COLUMN "categorieId"`);
    }

}
