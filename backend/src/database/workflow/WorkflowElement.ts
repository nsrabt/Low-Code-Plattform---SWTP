import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class workflowElement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    workflowID:number;

    @Column()
    title: string;

    @Column()
    stepNumber: number;

    @Column()
    data:string;
}