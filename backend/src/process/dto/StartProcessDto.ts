import {IsBoolean, IsNumber} from "class-validator";

export class StartProcessDto {
    @IsNumber()
    userID: number;

    @IsNumber()
    workflowID: number;

    @IsBoolean()
    isNew: boolean

}