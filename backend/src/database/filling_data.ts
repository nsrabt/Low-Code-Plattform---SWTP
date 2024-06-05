import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class filling_data{
    @PrimaryGeneratedColumn()
    data_id: number;
    @Column()
    platformid:number;
    @Column()
    name: string;
    @Column()
    datatype:string;
    @Column()
    isPlatforminfo: boolean;

}