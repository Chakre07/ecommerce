import {Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import { v4 as uuidv4 } from 'uuid';

import { Buy, PAID_TYPE } from '../entity/Buy';
import { User } from '../entity/User';
import { Payment } from '../entity/Payment';
import { Product } from '../entity/Product';

export class buyController{
    static createBuy= async(req:Request, res:Response)=>{
        const userId:number = Number(req.params.userId)
        const paymentId:number =  Number(req.params.paymentId)
        const productIds = Array.isArray(req.query.productIds)
        ? req.query.productIds
        : [req.query.productIds];
            const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
        const products = await AppDataSource.getRepository(Product).findByIds(productIds)
        const payment = await AppDataSource.getRepository(Payment).findOneBy({id:paymentId})
        const newBuy: Buy= {
            id: uuidv4(),
            payedType: PAID_TYPE.NOT_PAID,
            user,
            products,
            payment,
            isPayed: false
        };
     AppDataSource.getRepository(Buy).create(newBuy)
    }

    static getAllBuys = async(req:Request, res:Response)=>{
        const userId = Number(req.params.userId)
        const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
        const result = await AppDataSource.getRepository(Buy).find({ where: { user } })
        if(result.length >=0){
            res.json(result)
        }
        throw new Error('No purchase history')
    }
   
}