import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
/*
    This isn't relevant for now. We still build the whole website, so that it could be expanded into a multiplatform-software.

    for now: THM id = 1
 */
@Entity()
export class platform{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    picture:string;

    @Column()
    platformName:string;

    //password how??
}