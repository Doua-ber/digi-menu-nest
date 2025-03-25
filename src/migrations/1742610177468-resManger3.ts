import { MigrationInterface, QueryRunner } from "typeorm";

export class ResManger31742610177468 implements MigrationInterface {
    name = 'ResManger31742610177468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurantsssssssssssss_managers" ("restaurantsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_055e667256df708ba2cb7483aa2" PRIMARY KEY ("restaurantsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d545a381d8b2a42c8c72151f1" ON "restaurantsssssssssssss_managers" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_19ac049ff218ee0fd71eba210f" ON "restaurantsssssssssssss_managers" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "restaurantsssssssssssss_managers" ADD CONSTRAINT "FK_3d545a381d8b2a42c8c72151f1c" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurantsssssssssssss_managers" ADD CONSTRAINT "FK_19ac049ff218ee0fd71eba210f8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurantsssssssssssss_managers" DROP CONSTRAINT "FK_19ac049ff218ee0fd71eba210f8"`);
        await queryRunner.query(`ALTER TABLE "restaurantsssssssssssss_managers" DROP CONSTRAINT "FK_3d545a381d8b2a42c8c72151f1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19ac049ff218ee0fd71eba210f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d545a381d8b2a42c8c72151f1"`);
        await queryRunner.query(`DROP TABLE "restaurantsssssssssssss_managers"`);
    }

}
