import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Buy } from "./Buy";

enum payment_type {
    ESEWA = 'esewa',
    KHALTI = 'khalti'
}
@Entity()
 export class Payment{
     @PrimaryGeneratedColumn()
    id: number
     @Column()
     payment_type: payment_type
     @Column()
     amountPaid: number
     @OneToMany(() => Buy, (buy) => buy.payment)
     buys: Buy[];
    
 }