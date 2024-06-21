import {IsBoolean, IsNumber, IsString} from "class-validator";


export class AddFillingDataDto{

    //platformID 1 = THM
    @IsNumber()
    platformID: number;

    @IsString()
    name: string;

    @IsString()
    datatype: string;

    @IsBoolean()
    isPlatformInfo: boolean;
}