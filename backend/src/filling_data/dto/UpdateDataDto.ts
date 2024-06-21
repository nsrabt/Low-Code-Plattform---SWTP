import {IsBoolean, IsNumber, IsString} from "class-validator";


export class UpdateDataDto{


    @IsString()
    name: string;

    @IsString()
    datatype: string;

}