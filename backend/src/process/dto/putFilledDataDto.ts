import {IsNumber, IsString} from "class-validator";

export class filledDataDto {
    @IsNumber()
    dataID:number;

    @IsString()
    value:string;

    @IsNumber()
    userID:number;
}