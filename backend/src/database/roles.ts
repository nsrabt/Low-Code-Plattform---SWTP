import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class roles{
    @PrimaryGeneratedColumn()
    roleID: number;

    @Column()
    roleName:string;

    @Column()
    platformID: number;

    @Column("boolean", { array: true })
    permissions: boolean[];
    
}