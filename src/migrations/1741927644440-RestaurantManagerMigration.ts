import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantManagerMigration1741927644440 implements MigrationInterface {
    name = 'RestaurantManagerMigration1741927644440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`CREATE TABLE "restaurant_requests" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "nomRestaurant" character varying NOT NULL, "adresseEng" character varying NOT NULL, "adresseAr" character varying NOT NULL, "isApproved" boolean NOT NULL DEFAULT false, "managerId" integer, CONSTRAINT "PK_a6f8a22f06c39cf9f71acd36cc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants_managers_users" ("restaurantsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4f4cc7d214644b9b5bf9df19293" PRIMARY KEY ("restaurantsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e91366b6eca0710b69048d75f6" ON "restaurants_managers_users" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6686fe8b0f4d60e1415cd4a3f" ON "restaurants_managers_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isOwner" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" ADD CONSTRAINT "FK_e91366b6eca0710b69048d75f68" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" ADD CONSTRAINT "FK_f6686fe8b0f4d60e1415cd4a3f9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" DROP CONSTRAINT "FK_f6686fe8b0f4d60e1415cd4a3f9"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" DROP CONSTRAINT "FK_e91366b6eca0710b69048d75f68"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isOwner" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6686fe8b0f4d60e1415cd4a3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e91366b6eca0710b69048d75f6"`);
        await queryRunner.query(`DROP TABLE "restaurants_managers_users"`);
        await queryRunner.query(`DROP TABLE "restaurant_requests"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
