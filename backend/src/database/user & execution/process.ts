import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class process{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    workflowID: number;

    @Column()
    curStep:number;

    @Column()
    isAccepted: boolean;

    @Column()
    workflowVersion: number;
}