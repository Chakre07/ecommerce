import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"
import { Payment } from "./entity/Payment"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "Ecommerce",
    synchronize: true,
    logging: false,
    entities: [User, Product, Payment],
    migrations: [],
    subscribers: [],
})