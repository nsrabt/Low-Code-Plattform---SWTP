import {IsBoolean, IsNumber, IsString} from "class-validator";

export class UpdateProcessRoleDto {


    @IsNumber()
    roleID: number;
    //maybe instead of Moderator, Moderator, Moderator => Moderator, assistant Moderator ...
    @IsString()
    process_role_name: string
    /*
    can the user chose who should take this role?
    for example. which prof is responsible for the student

    but the user shouldn't choose which assistant will work on this
     */
    @IsBoolean()
    selectable: boolean;


}