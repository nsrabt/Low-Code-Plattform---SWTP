import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
/*
    This entity gives each field a role which can fill out this field.
    To each process_role_id there is one person
    could be filled out by multiple persons
*/
@Entity()
export class field_roles {
    @PrimaryGeneratedColumn()
    fieldRoleID: number;

    @Column()
    fieldID: number;

    @Column()
    process_role_id: number;
}