import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userID: number;
    @Column()
    processID: number;
    @Column()
    done:boolean;
    @Column()
    state:string;
}