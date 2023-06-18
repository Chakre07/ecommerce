import {NextFunction, Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { DeleteResult } from 'typeorm';
interface CustomRequest extends Request {
    user?: User;
  }
  

export class userController{
    static createUser = async(req:Request, res:Response)=>{
        bcrypt.hash(req.body.password, 8 , function(err:Error, hash:any){
            const newUser:Partial<User>= {
                id: uuidv4(),
                username: req.body.username,
                password: hash,
                createdAt: Date.now() as unknown as Date,
                updatedAt:Date.now() as unknown as Date,
                isAdmin: false
            };
        const response:User = AppDataSource.getRepository(User).create(newUser)
        res.json(response)
        })
    }
   
    static getAllUser = async(req:Request, res:Response)=>{
        const result:Array<User> = await AppDataSource.getRepository(User).find({where: {isAdmin: false}});
        if(result.length >=0){

            res.json(result)
        }
        throw new Error('User not found')
     }

     static getUserById = async(req:Request, res:Response)=>{
        const id:number  = Number(req.params.id)
        const result:User = await AppDataSource.getRepository(User).findOneBy({id:id})
        if(result.id){
            res.json(result)
        }
        throw new Error('User not found')
     }
     static updateUser = async(req:Request, res:Response)=>{
        const id = Number(req.params.id)
        const existingUser:User = await AppDataSource.getRepository(User).findOneByOrFail({id:id})
        if(existingUser.id){
            const updatedUsed:User = req.body
        const result:User = {...existingUser, ...updatedUsed}
        await AppDataSource.getRepository(User).save(result)
        res.json({message:"User details Updated Successfully",
        data: result
        })
        }
        throw new Error('User not found')
        
     }

     static removeUser = async(req:Request , res:Response)=>{
        const id = Number(req.params.id)
        const result:DeleteResult = await AppDataSource.getRepository(User).delete(id)
        res.json("User Account Deleted successfully")
     }

     static createAdmin = async(req:Request, res:Response)=>{
        bcrypt.hash(req.body.password, 8 , function(err:Error, hash:any){
            const newUser:Partial<User>= {
                id: uuidv4(),
                username: req.body.username,
                password: hash,
                createdAt: Date.now() as unknown as Date,
                updatedAt:Date.now() as unknown as Date,
                isAdmin: true
            };
        const response:User = AppDataSource.getRepository(User).create(newUser)
        res.json(response)
        })
    }

    static loginAdmin = async(req:CustomRequest, res:Response, next:NextFunction)=>{
        const { username, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const admin = await userRepository.findOne({ where: { username, isAdmin: true } });
      
        if (!admin) {
          return res.status(404).json({ error: 'Admin not found' });
        }
      
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);
      
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.user = admin;
        next();
        // Admin login successful
        return res.status(200).json({ message: 'Admin login successful' });
    }
    static loginUser = async(req:CustomRequest, res:Response, next:NextFunction )=>{
        const { username, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username, isAdmin: false } });
      
        if (!user) {
          return res.status(404).json({ error: 'user not found' });
        }
      
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
      
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      
        req.user = user;
        next();
        // user login successful
        return res.status(200).json({ message: 'user login successful' });
    }

    
    
}