import {IsNumber} from "class-validator";

export class AssignRoleDto{
    @IsNumber()
    step_id: number;

    @IsNumber()
    process_role_id: number;
}