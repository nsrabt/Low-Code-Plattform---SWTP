import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_fillingdata{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userID: number;
    //filling data id
    @Column()
    pi_id: number;
    @Column()
    value: string;
}