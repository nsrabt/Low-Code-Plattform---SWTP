import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class platform{
    @PrimaryGeneratedColumn()
    platformId:number;

    @Column()
    picture:string;

    @Column()
    platformName:string;

    //password how??
}