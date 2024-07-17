import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class fields {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    workflowElementID:number;
//    @Column()
//    data: string;
    @Column()
    dataID: number;
    @Column()
    type: string;
}