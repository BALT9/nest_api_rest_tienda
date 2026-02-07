// Archivo de configuracion para migraciones

import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + "/src/**/*.entity{.ts, .js}"],
    migrations: [__dirname + "/src/database/migrations/*{.ts, .js}"],
    synchronize: false
});