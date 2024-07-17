import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {roles} from "./roles";
import {workflowElement} from "./WorkflowElement";

@Entity()
export class workflowElement_roles{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    workflowElementID: number;

    @Column()
    workflowRoleID: number;

    @Column()
    position: number;

}