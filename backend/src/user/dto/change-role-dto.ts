import {IsNumber, IsString} from "class-validator";


export class ChangeRoleDto {
    @IsNumber()
    userID: number;

    @IsNumber()
    roleID: number;


}
