import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class fields {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    stepID:number;
//    @Column()
//    data: string;
    @Column()
    dataID: number;
    @Column()
    type: string;
}