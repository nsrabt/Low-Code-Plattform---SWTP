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
    can the applicant chose who should take this role?
    for example. which prof is responsible for the student

    but the user shouldn't choose which assistant will work on this

    so the roles who are not selectable will be filled manually.
    the users with the needed roles will have it added to their process overview

     */
    @Column()
    selectable: boolean;
    /*
    The person that applies for the process always gets this role
     */
    @Column()
    isApplicant: boolean;
}