import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamaRestoManager1742495012614 implements MigrationInterface {
    name = 'RenamaRestoManager1742495012614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurants_managers" ("restaurantsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_9f62ca2819c2b540233707fce6f" PRIMARY KEY ("restaurantsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c9d8458bd4f85d8586d7950b9e" ON "restaurants_managers" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a98fb374919938459b7885198b" ON "restaurants_managers" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_c9d8458bd4f85d8586d7950b9e3" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_a98fb374919938459b7885198b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_a98fb374919938459b7885198b1"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_c9d8458bd4f85d8586d7950b9e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98fb374919938459b7885198b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9d8458bd4f85d8586d7950b9e"`);
        await queryRunner.query(`DROP TABLE "restaurants_managers"`);
    }

}
