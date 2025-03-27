import { MigrationInterface, QueryRunner } from "typeorm";

export class RubriqueRestaurant1743039069865 implements MigrationInterface {
    name = 'RubriqueRestaurant1743039069865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rubriques" ADD "restaurantId" integer`);
        await queryRunner.query(`ALTER TABLE "rubriques" ADD CONSTRAINT "FK_2bed6961732166476c1995122ab" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rubriques" DROP CONSTRAINT "FK_2bed6961732166476c1995122ab"`);
        await queryRunner.query(`ALTER TABLE "rubriques" DROP COLUMN "restaurantId"`);
    }

}
