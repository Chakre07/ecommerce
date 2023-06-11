import { AppDataSource } from "./data-source"
// import * as bodyParser from "body-parser"
import express,{Request,Response,NextFunction} from 'express'

const app = express()

AppDataSource.initialize().then(async () => {
// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.listen(5000, ()=>console.log("App Running"))


}).catch(error => console.log(error))