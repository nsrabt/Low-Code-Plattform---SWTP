import {IsNumber} from "class-validator";

export class AssignRoleDto{
    @IsNumber()
    step_id: number;

    @IsNumber()
    workflowRoleID: number;
}