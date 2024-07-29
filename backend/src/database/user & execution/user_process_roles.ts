import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process_roles {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    processID:number;
    @Column()
    workflowRoleID:number;
    @Column()
    userID: number
}