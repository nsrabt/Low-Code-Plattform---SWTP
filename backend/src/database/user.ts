import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    profilePicture: string;

    @Column()
    eMail: string;
}