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
        0 => processes
        1 => use admin dashboard
        2 => edit workflows
        4 => edit platform-info
     */
    @Column("boolean", {array: true})
    permissions: boolean[];

}