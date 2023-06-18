import {Router} from 'express'
import { buyController } from '../Controller/buyController'

const buyRoute:Router = Router()

buyRoute.post('/product', buyController.createBuy)
buyRoute.get('/:userId', buyController.getAllBuys)

export default buyRoute
