import { MigrationInterface, QueryRunner } from "typeorm";

export class ManagersAdminsMigration1742320661044 implements MigrationInterface {
    name = 'ManagersAdminsMigration1742320661044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean NOT NULL DEFAULT false, "roleId" integer, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "managers" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isOwner" boolean NOT NULL DEFAULT false, "roleId" integer, CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants_managers_managers" ("restaurantsId" integer NOT NULL, "managersId" integer NOT NULL, CONSTRAINT "PK_6b794d6feeeba540d90c2328e8f" PRIMARY KEY ("restaurantsId", "managersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae7a9867328735ed87a9f424d7" ON "restaurants_managers_managers" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_70c3c063d2ff65fdf5d729baa6" ON "restaurants_managers_managers" ("managersId") `);
        await queryRunner.query(`ALTER TABLE "admins" ADD CONSTRAINT "FK_d27f7a7f01967e4a5e8ba73ebb0" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_726c4c250e5c1265eeaa0bf137d" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_managers" ADD CONSTRAINT "FK_ae7a9867328735ed87a9f424d79" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_managers" ADD CONSTRAINT "FK_70c3c063d2ff65fdf5d729baa62" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers_managers" DROP CONSTRAINT "FK_70c3c063d2ff65fdf5d729baa62"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_managers" DROP CONSTRAINT "FK_ae7a9867328735ed87a9f424d79"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_726c4c250e5c1265eeaa0bf137d"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP CONSTRAINT "FK_d27f7a7f01967e4a5e8ba73ebb0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70c3c063d2ff65fdf5d729baa6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae7a9867328735ed87a9f424d7"`);
        await queryRunner.query(`DROP TABLE "restaurants_managers_managers"`);
        await queryRunner.query(`DROP TABLE "managers"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
