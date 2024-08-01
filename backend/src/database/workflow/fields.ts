import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class fields {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    workflowElementID:number;
    @Column()
    fieldName: string;
    @Column()
    dataID: number;
    @Column()
    type: string;
    @Column()
    processRoleID: number;
    @Column("double precision",{array:true})
    picInfo: number[];
}
