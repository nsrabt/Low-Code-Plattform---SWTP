import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process_roles {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    process_role_id:number;
    @Column()
    userID: number
}