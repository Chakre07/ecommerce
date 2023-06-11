import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3300,
    username: "root",
    password: "",
    database: "comment",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})