import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class process{
    @PrimaryGeneratedColumn()
    process_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    platform_id: number;

    @Column()
    isOpen: boolean;
}