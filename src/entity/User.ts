import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm"
import { Buy } from "./Buy"

@Entity()
 export class User  {
     @PrimaryGeneratedColumn()
    id: number
     @Column()
     username: string
     @Column()
    password: string
    @CreateDateColumn()
    createdAt?: Date
    @CreateDateColumn()
    updatedAt: Date
    @Column()
    isAdmin?: boolean
    @OneToMany(() => Buy, (buy) => buy.user)
    buys: Buy[];
 }