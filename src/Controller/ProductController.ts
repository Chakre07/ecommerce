import {Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import { v4 as uuidv4 } from 'uuid';
import { DeleteResult } from 'typeorm';
import { Product } from '../entity/Product';

export class productController{
    static createProduct= async(req:Request, res:Response)=>{
        const newProduct= {
            id: uuidv4(),
            name:req.body.name,
            price:req.body.price,
            image: req.body.image,
            description:req.body.description,
            postedAt: Date.now() as unknown as Date,
            updatedAt: Date.now() as unknown as Date,
        };
        
    const response:Product = AppDataSource.getRepository(Product).create(newProduct)
        res.json(response)
    }
   
    static getAllProduct = async(req:Request, res:Response)=>{
        const result:Array<Product> = await AppDataSource.getRepository(Product).find();
        if(result.length >=0){

            res.json(result)
        }
        throw new Error('No any found')
     }

     static getProductById = async(req:Request, res:Response)=>{
        const id:number  = Number(req.params.id)
        const result:Product = await AppDataSource.getRepository(Product).findOneBy({id:id})
        if(result.id){
            res.json(result)
        }
        throw new Error('No product found')
     }
     static updateProduct = async(req:Request, res:Response)=>{
        const id = Number(req.params.id)
        const existingProduct:Product = await AppDataSource.getRepository(Product).findOneByOrFail({id:id})
        if(existingProduct.id){
            const updatedProduct:Product = req.body
        const result:Product = {...existingProduct, ...updatedProduct}
        await AppDataSource.getRepository(Product).save(result)
        res.json({message:"Product details Updated Successfully",
        data: result
        })
        }
        throw new Error('No product found')
        
     }

     static removeProduct= async(req:Request , res:Response)=>{
        const id = Number(req.params.id)
        const result:DeleteResult = await AppDataSource.getRepository(Product).delete(id)
        res.json("Product Deleted successfully")
     }
    
}