import {Router} from 'express'
import { buyController } from '../Controller/buyController'
import { paymentController } from '../Controller/paymentController'

const paymentRoute:Router = Router()

paymentRoute.post('/products', paymentController.makePayment)

export default paymentRoute
