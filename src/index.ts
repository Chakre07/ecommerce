import "reflect-metadata"
import { AppDataSource } from "./data-source"

import express,{Request,Response,NextFunction, Router} from 'express'
import router from "./route/userRoute"
import productRoute from "./route/productRoute"
import buyRoute from "./route/buyRoute"
import paymentRoute from "./route/paymentRoute"
const app = express()

AppDataSource.initialize().then(async () => {
app.use(express.json())
app.use('/user', router)
app.use('/product',productRoute)
app.use('/buy', buyRoute)
app.use('/payment', paymentRoute)

app.use(express.urlencoded({extended:false}))
app.listen(5000, ()=>console.log("App Running"))


}).catch(error => console.log(error))