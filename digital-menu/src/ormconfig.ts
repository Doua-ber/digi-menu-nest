
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'postgres',
    host:'localhost',
    port:  5432,
    username: 'postgres',
    password: 'douaDB123+-',
    database: 'digitalMenuDb',
  entities: ['dist/**/*.entity.js'],  
  migrations: ['dist/migrations/*.js'], 
  synchronize: false,
  logging: true,
});

export default AppDataSource;  

