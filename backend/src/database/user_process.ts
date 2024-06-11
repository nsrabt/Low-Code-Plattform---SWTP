import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process{
    @PrimaryGeneratedColumn()
    user_process_id: number;
    @Column()
    userID: number;
    @Column()
    processID: number;
    @Column()
    done:boolean;
}