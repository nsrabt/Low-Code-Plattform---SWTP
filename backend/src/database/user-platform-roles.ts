import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_platform_roles{
    @PrimaryGeneratedColumn()
    upr_id: number;
    @Column()
    userID:number;
    @Column()
    roleID:number;
}