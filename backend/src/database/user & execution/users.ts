import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    profilePicture: string;

    @Column()
    eMail: string;

    @Column()
    name: string;
}