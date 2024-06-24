import {IsNumber, IsString} from "class-validator";

export class UpdateUserDataDto{
    @IsNumber()
    dataID: number;

    @IsNumber()
    userID: number;

    @IsString()
    value: string;
}