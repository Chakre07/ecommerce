import {Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import { v4 as uuidv4 } from 'uuid';
import { Buy, PAID_TYPE } from '../entity/Buy';
import { Payment } from '../entity/Payment';
import { Product } from '../entity/Product';

export class paymentController{
    static makePayment= async(req:Request, res:Response)=>{
        const buyIds = Array.isArray(req.query.productIds)
        ? req.query.productIds
        : [req.query.productIds];
        const buy = await AppDataSource.getRepository(Buy).findByIds(buyIds)
        const pay = {
            id: uuidv4,
            Payment_type: req.body.paymentType,
            //TODO: integrate payment gateway
            amountPaid: req.body.amountPaid,
            buys: buy
        }
        const response = AppDataSource.getRepository(Payment).create(pay)
        response.buys.forEach((buy)=>{
            buy.products.forEach(async(product)=>{
                let updateBuys: Partial<Buy>
                if(Number(product.price) === Number(buy.payment.amountPaid)){
                     updateBuys ={
                        isPayed: true,
                        payedType: PAID_TYPE.FULLY_PAID
                    }
                }else if(Number(buy.payment.amountPaid)>0 && Number(buy.payment.amountPaid)< Number(product.price)){
                    updateBuys = {
                        isPayed:false,
                        payedType: PAID_TYPE.PARTIALLY_PAID
                    }
                }
                const result:Buy = {...buy, ...updateBuys}
            const buyResponse =  await AppDataSource.getRepository(Product).save(result)
            if(buyResponse.isPayed){
                res.json({message: 'Buy successfull', data: product})
            }
            })
        })

    }
   
}