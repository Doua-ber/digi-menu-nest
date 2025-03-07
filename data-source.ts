import { Manager } from "src/manager/entities/manager.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Admin, DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'douaDB123+-',
  database: 'digitalMenuDb',
  entities: [User, Admin, Manager, Role],  // Ajoutez ici toutes vos entités
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
});
