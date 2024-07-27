import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class workflow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    platform_id: number;

    @Column()
    isOpen: boolean;

    @Column({ type: "integer", default: 1 })
    version: number;
}