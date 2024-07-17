import {Column, Entity} from "typeorm";

@Entity()
export class user_notifications {
    @Column()
    id: number;

    @Column()
    userID:number;

    @Column()
    message: string;

    @Column()
    link: string;
}
