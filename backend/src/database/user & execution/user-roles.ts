import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_platform_roles{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userID:number;
    @Column()
    roleID:number;
    @Column()
    platformID:number;
}