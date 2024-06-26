import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process_step{
    @PrimaryGeneratedColumn()
    ups_id: number;
    @Column()
    up_id:number;
    @Column()
    stepID:number;
    @Column()
    data:string;
    @Column()
    done: boolean;

}