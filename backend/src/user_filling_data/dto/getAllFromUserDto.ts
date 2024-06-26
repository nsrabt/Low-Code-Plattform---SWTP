import {IsNumber} from "class-validator";

export class GetAllFromUserDto {
    @IsNumber()
    userID: number;

    @IsNumber()
    platformID:number
}