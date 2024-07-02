import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {roles} from "./roles";
import {step} from "./step";

@Entity()
export class step_roles{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    step_id: number;

    @Column()
    process_role_id: number;


}