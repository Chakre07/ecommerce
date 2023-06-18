import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
import { Product } from "./Product";
import { Payment } from "./Payment";
export enum PAID_TYPE{
  'FULLY_PAID' = 'Paid',
  'PARTIALLY_PAID' = 'partially paid',
  'NOT_PAID' = 'not paid'
}

@Entity()
export class Buy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPayed?: boolean
  @Column()
  payedType: PAID_TYPE 
  @ManyToOne(() => User, (user) => user.buys)
  user: User;

  @ManyToMany(() => Product, (product) => product.buys)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Payment, (payment) => payment.buys)
  payment: Payment;

  // Add other buy-related columns as needed
}