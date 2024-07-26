import {IsBoolean, IsNumber} from "class-validator";

export class ContinueProcessDto {
    @IsNumber()
    processID:number;

    @IsNumber()
    userID:number;



}