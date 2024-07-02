import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class users{
    @PrimaryGeneratedColumn({name: 'userID',type: "int"})
    id:number;

    @Column()
    username: string;

    @Column()
    profilePicture: string;

    @Column()
    eMail: string;
}