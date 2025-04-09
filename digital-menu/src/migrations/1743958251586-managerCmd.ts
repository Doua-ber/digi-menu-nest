import { MigrationInterface, QueryRunner } from "typeorm";

export class ManagerCmd1743958251586 implements MigrationInterface {
    name = 'ManagerCmd1743958251586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`CREATE TABLE "commandes_managers_users" ("commandesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_75ca14303f4e8d83fb6fa597c31" PRIMARY KEY ("commandesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd4dc08215da8692ed88e3db2e" ON "commandes_managers_users" ("commandesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f1bb631c891ef3b6de49cbae5" ON "commandes_managers_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "commandes" DROP COLUMN "managersId"`);
        await queryRunner.query(`ALTER TABLE "commandes_managers_users" ADD CONSTRAINT "FK_dd4dc08215da8692ed88e3db2e7" FOREIGN KEY ("commandesId") REFERENCES "commandes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "commandes_managers_users" ADD CONSTRAINT "FK_8f1bb631c891ef3b6de49cbae5d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes_managers_users" DROP CONSTRAINT "FK_8f1bb631c891ef3b6de49cbae5d"`);
        await queryRunner.query(`ALTER TABLE "commandes_managers_users" DROP CONSTRAINT "FK_dd4dc08215da8692ed88e3db2e7"`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD "managersId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f1bb631c891ef3b6de49cbae5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd4dc08215da8692ed88e3db2e"`);
        await queryRunner.query(`DROP TABLE "commandes_managers_users"`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
