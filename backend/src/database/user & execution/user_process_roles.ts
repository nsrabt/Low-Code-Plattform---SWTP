import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserProcessRoles {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    process_role_id:number;
    @Column()
    userID: number
}