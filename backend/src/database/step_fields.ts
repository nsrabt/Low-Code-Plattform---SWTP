import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class step_fields{
    @PrimaryGeneratedColumn()
    step_field_id: number;
    @Column()
    stepID:number;
    @Column()
    data: string;
    @Column()
    dataID: number;
    @Column()
    type: string;
}