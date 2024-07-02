import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, IsString} from "class-validator";
import {process} from "./process";
/*
    This function only says which roles should get defined in the process.
    for example
    Professor, Student, Assistant 1, Assisitant 2
 */
@Entity()
export class process_roles{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    processID: number;

    @Column()
    roleID: number;
    //maybe instead of Moderator, Moderator, Moderator: Moderator, assistant Moderator ...
    @Column()
    process_role_name: string
    /*
    can the user chose who should take this role?
    for example. which prof is responsible for the student

    but the user shouldn't choose which assistant will work on this
     */
    @Column()
    selectable: boolean;
}