import {IsArray, IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";

export class UpdateFieldDto{
    @IsNumber()
    id:number;

    @IsString()
    dataID: number;

    @IsString()
    type: string;

    @IsArray()
    fieldInfo:number[]

    @IsNumber()
    processRoleID: number;

}