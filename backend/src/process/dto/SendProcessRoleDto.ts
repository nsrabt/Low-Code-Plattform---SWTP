import {IsNumber} from "class-validator";

export class SendProcessRoleDto{
    @IsNumber()
    processRoleID:number;

    @IsNumber()
    userID:number;
}