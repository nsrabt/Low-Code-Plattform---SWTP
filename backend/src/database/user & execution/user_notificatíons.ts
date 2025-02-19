import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user_notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID:number;

    @Column()
    message: string;

    @Column()
    link: string;
}
