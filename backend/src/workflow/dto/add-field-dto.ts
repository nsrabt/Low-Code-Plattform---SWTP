import {IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";

export class AddFieldDto{
    @IsNumber()
    workflowElementID: number;

    @IsString()
    dataID: number;

    @IsString()
    type: string;

    @IsNumber()
    processRoleID: number;

    @IsString()
    name: string;

}