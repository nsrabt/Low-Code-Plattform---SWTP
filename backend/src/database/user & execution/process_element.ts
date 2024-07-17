import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class process_element{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    processID: number;

    @Column()
    workflowElementID: number;

    @Column()
    phase: number;

    @Column()
    data:string;
}