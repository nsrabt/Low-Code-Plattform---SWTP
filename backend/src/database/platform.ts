import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class platform{
    @PrimaryGeneratedColumn()
    platformId:number;
    @Column()
    picture:string;
    @Column()
    platformName:string;
}