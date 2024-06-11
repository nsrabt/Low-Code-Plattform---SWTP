import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_filling_data{
    @PrimaryGeneratedColumn()
    upi_id: number;
    @Column()
    userID: number;
    //filling data id
    @Column()
    pi_id: number;
    @Column()
    value: number;
}