import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1742312468480 implements MigrationInterface {
    name = 'FirstMigration1742312468480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "titleEng" character varying NOT NULL, "titleAr" character varying, "scope" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "titleEng" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenomnnnnn" character varying, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean DEFAULT false, "isOwner" boolean DEFAULT false, "type" character varying NOT NULL, "roleId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8" ON "users" ("type") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "nomEng" character varying NOT NULL, "nomAr" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_requests" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, "nomRestaurant" character varying NOT NULL, "adresseEng" character varying NOT NULL, "adresseAr" character varying NOT NULL, "isApproved" boolean NOT NULL DEFAULT false, "managerId" integer, CONSTRAINT "PK_a6f8a22f06c39cf9f71acd36cc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commandes" ("id" SERIAL NOT NULL, "totalPrix" double precision NOT NULL, "statut" character varying NOT NULL, "livraison" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "restaurantId" integer, "managersId" integer, CONSTRAINT "PK_048c7aef9a99d4aed24c9054893" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "adresseEng" character varying NOT NULL, "adresseAr" character varying NOT NULL, "qrCode" character varying NOT NULL, "isActive" boolean NOT NULL, "categorieId" integer, CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produits" ("id" SERIAL NOT NULL, "nomEng" character varying NOT NULL, "nomAr" character varying NOT NULL, "prix" double precision NOT NULL, "image" character varying NOT NULL, "stock" integer NOT NULL, "disponibilite" boolean NOT NULL, "rubriquesId" integer, "restaurantId" integer, CONSTRAINT "PK_738095029a8d184b11939537702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rubriques" ("id" SERIAL NOT NULL, "nomEng" character varying NOT NULL, "nomAr" character varying NOT NULL, CONSTRAINT "PK_f3fb3ad160094df462f4fcfc7a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("rolesId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_f8e26259e2114a037f1180ec0d8" PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf98d8fd47610db71dfc5a4a5f" ON "roles_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f25fd350775094ceb3a02c1468" ON "roles_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "admins_restaurants" ("admin_id" integer NOT NULL, "restaurant_id" integer NOT NULL, CONSTRAINT "PK_e022c12d2b28836be059d542c85" PRIMARY KEY ("admin_id", "restaurant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f044af00750f934c20138d7eb" ON "admins_restaurants" ("admin_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ec4bfdfdd471c003642564b324" ON "admins_restaurants" ("restaurant_id") `);
        await queryRunner.query(`CREATE TABLE "restaurants_managers_users" ("restaurantsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4f4cc7d214644b9b5bf9df19293" PRIMARY KEY ("restaurantsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e91366b6eca0710b69048d75f6" ON "restaurants_managers_users" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6686fe8b0f4d60e1415cd4a3f" ON "restaurants_managers_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" ADD CONSTRAINT "FK_2f58696fa299b31b6a94c497053" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_5751e21265353131b749d366d3c" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_d9a68927efa05a505c18eab4101" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commandes" ADD CONSTRAINT "FK_44ca413f05421f11492356bc135" FOREIGN KEY ("managersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurants" ADD CONSTRAINT "FK_fb296aa00ed697ac571abeb2a4d" FOREIGN KEY ("categorieId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produits" ADD CONSTRAINT "FK_ce46efe1fd083e642c7dae356ef" FOREIGN KEY ("rubriquesId") REFERENCES "rubriques"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produits" ADD CONSTRAINT "FK_1c0701d08f2c4bb96abb85ca7f1" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_f25fd350775094ceb3a02c14681" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_7f044af00750f934c20138d7eb2" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" ADD CONSTRAINT "FK_ec4bfdfdd471c003642564b324a" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" ADD CONSTRAINT "FK_e91366b6eca0710b69048d75f68" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" ADD CONSTRAINT "FK_f6686fe8b0f4d60e1415cd4a3f9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" DROP CONSTRAINT "FK_f6686fe8b0f4d60e1415cd4a3f9"`);
        await queryRunner.query(`ALTER TABLE "restaurants_managers_users" DROP CONSTRAINT "FK_e91366b6eca0710b69048d75f68"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_ec4bfdfdd471c003642564b324a"`);
        await queryRunner.query(`ALTER TABLE "admins_restaurants" DROP CONSTRAINT "FK_7f044af00750f934c20138d7eb2"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_f25fd350775094ceb3a02c14681"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff"`);
        await queryRunner.query(`ALTER TABLE "produits" DROP CONSTRAINT "FK_1c0701d08f2c4bb96abb85ca7f1"`);
        await queryRunner.query(`ALTER TABLE "produits" DROP CONSTRAINT "FK_ce46efe1fd083e642c7dae356ef"`);
        await queryRunner.query(`ALTER TABLE "restaurants" DROP CONSTRAINT "FK_fb296aa00ed697ac571abeb2a4d"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_44ca413f05421f11492356bc135"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_d9a68927efa05a505c18eab4101"`);
        await queryRunner.query(`ALTER TABLE "commandes" DROP CONSTRAINT "FK_5751e21265353131b749d366d3c"`);
        await queryRunner.query(`ALTER TABLE "restaurant_requests" DROP CONSTRAINT "FK_2f58696fa299b31b6a94c497053"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6686fe8b0f4d60e1415cd4a3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e91366b6eca0710b69048d75f6"`);
        await queryRunner.query(`DROP TABLE "restaurants_managers_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec4bfdfdd471c003642564b324"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f044af00750f934c20138d7eb"`);
        await queryRunner.query(`DROP TABLE "admins_restaurants"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f25fd350775094ceb3a02c1468"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf98d8fd47610db71dfc5a4a5f"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "rubriques"`);
        await queryRunner.query(`DROP TABLE "produits"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`DROP TABLE "commandes"`);
        await queryRunner.query(`DROP TABLE "restaurant_requests"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94e2000b5f7ee1f9c491f0f8a8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
