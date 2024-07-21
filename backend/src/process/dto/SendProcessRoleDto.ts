import {IsNumber} from "class-validator";

export class SendProcessRoleDto{
    @IsNumber()
    workflowRoleID:number;

    @IsNumber()
    userID:number;
}