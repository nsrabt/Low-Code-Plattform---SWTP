import {IsNumber} from "class-validator";

export class StartProcessDto {
    @IsNumber()
    userID: number;

    @IsNumber()
    workflowID: number;


}