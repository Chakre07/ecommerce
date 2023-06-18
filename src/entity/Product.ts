import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne, ManyToMany, JoinTable } from "typeorm"
import { Buy } from "./Buy"


@Entity()
 export class Product {
     @PrimaryGeneratedColumn()
    id: number
     @Column()
     name: string
     @Column()
    price: number
    @Column()
    image: string
    @Column()
    description: string
    @CreateDateColumn()
    postedAt: Date
    @CreateDateColumn()
    updatedAt: Date
    @ManyToMany(() => Buy, (buy) => buy.products)
    @JoinTable()
    buys: Buy[];
 }