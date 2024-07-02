import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class step{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    process_id:number;

    @Column()
    title: string;

    @Column()
    stepNumber: number;

    @Column()
    data:string;
}