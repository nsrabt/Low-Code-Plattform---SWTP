import {IsNumber, IsString} from "class-validator";

export class SetDataDto{
    @IsNumber()
    dataID: number;

    @IsNumber()
    userID: number;

    @IsString()
    value: string;
}