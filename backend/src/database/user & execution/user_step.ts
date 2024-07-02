import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_step {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    up_id:number;
    @Column()
    stepID:number;
    @Column()
    data:string;
    @Column()
    done: boolean;

}