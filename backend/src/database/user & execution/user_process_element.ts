import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_process_element {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    processID:number;

    @Column()
    userID: number;

    @Column()
    workflow_element_id:number;

    @Column()
    done: boolean;

}