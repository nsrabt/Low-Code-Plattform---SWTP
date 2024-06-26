import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class step{
    @PrimaryGeneratedColumn()
    step_id: number;

    @Column()
    process_id:number;

    @Column()
    title: string;

    @Column({ type: 'bytea', nullable: true })
    data:Uint8Array;
}