import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {roles} from "./roles";
import {step} from "./step";

@Entity()
export class step_roles{
    @PrimaryGeneratedColumn()
    step_role_id:number;

    @ManyToMany(()=>step)
    step_id: number;

    @Column()
    role_id: number;

}