import { MigrationInterface, QueryRunner } from "typeorm";

export class UserManagerMigration1741651653856 implements MigrationInterface {
    name = 'UserManagerMigration1741651653856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "managers_restaurants" DROP CONSTRAINT "FK_603053b4c42eae21f598ccbd660"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOwner" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8" ON "users" ("type") `);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "managers_restaurants" ADD CONSTRAINT "FK_603053b4c42eae21f598ccbd660" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "managers_restaurants" DROP CONSTRAINT "FK_603053b4c42eae21f598ccbd660"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94e2000b5f7ee1f9c491f0f8a8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOwner"`);
        await queryRunner.query(`ALTER TABLE "managers_restaurants" ADD CONSTRAINT "FK_603053b4c42eae21f598ccbd660" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
