import {IsNumber} from "class-validator";

export class GetSpecificDataDto {
    @IsNumber()
    userID:number;

    @IsNumber()
    dataId:number;
}