import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process_roles {
    @PrimaryGeneratedColumn()
    id:number;
    @PrimaryGeneratedColumn()
    processID:number;
    @Column()
    workflowRoleID:number;
    @Column()
    userID: number
}