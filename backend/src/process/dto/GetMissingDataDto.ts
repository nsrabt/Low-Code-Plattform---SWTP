import {IsNumber} from "class-validator";

export class GetMissingDataDto{
    @IsNumber()
    processID:number;

    @IsNumber()
    userID:number;
}