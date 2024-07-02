import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsArray} from "class-validator";

@Entity()
export class roles{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName:string;

    @Column()
    platformID: number;

    @Column()
    isDefault: boolean;

    /*
        0 => apply for process
        1 => check process overview
        2 => use monitoring dashboard
        3 => edit workflows
        4 => create workflows
        5 => edit platform-info
     */
    @Column("boolean", {array: true})
    permissions: boolean[];

}