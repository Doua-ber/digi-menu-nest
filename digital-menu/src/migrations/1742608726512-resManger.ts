import { MigrationInterface, QueryRunner } from "typeorm";

export class ResManger1742608726512 implements MigrationInterface {
    name = 'ResManger1742608726512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_a98fb374919938459b7885198b1"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_c9d8458bd4f85d8586d7950b9e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9d8458bd4f85d8586d7950b9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98fb374919938459b7885198b"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_9f62ca2819c2b540233707fce6f"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_a98fb374919938459b7885198b1" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP COLUMN "restaurantsId"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_a98fb374919938459b7885198b1"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD "restaurant_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_d1849da50a4d739c34ce63278e2" PRIMARY KEY ("restaurant_id")`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD "manager_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_d1849da50a4d739c34ce63278e2"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_6ade842e05b0ed5f2d6533ab139" PRIMARY KEY ("restaurant_id", "manager_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_d1849da50a4d739c34ce63278e" ON "restaurants_managers" ("restaurant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_db631da3938a21fb98f31e74a5" ON "restaurants_managers" ("manager_id") `);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_d1849da50a4d739c34ce63278e2" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_db631da3938a21fb98f31e74a52" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_db631da3938a21fb98f31e74a52"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "FK_d1849da50a4d739c34ce63278e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db631da3938a21fb98f31e74a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1849da50a4d739c34ce63278e"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_6ade842e05b0ed5f2d6533ab139"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_d1849da50a4d739c34ce63278e2" PRIMARY KEY ("restaurant_id")`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_d1849da50a4d739c34ce63278e2"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP COLUMN "restaurant_id"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_a98fb374919938459b7885198b1" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD "restaurantsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" DROP CONSTRAINT "PK_a98fb374919938459b7885198b1"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "PK_9f62ca2819c2b540233707fce6f" PRIMARY KEY ("restaurantsId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_a98fb374919938459b7885198b" ON "restaurants_managers" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9d8458bd4f85d8586d7950b9e" ON "restaurants_managers" ("restaurantsId") `);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_c9d8458bd4f85d8586d7950b9e3" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers" ADD CONSTRAINT "FK_a98fb374919938459b7885198b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
