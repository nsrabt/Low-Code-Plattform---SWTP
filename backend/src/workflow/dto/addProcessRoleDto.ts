import {IsBoolean, IsDefined, IsNumber, IsString} from "class-validator";
import {Column, PrimaryGeneratedColumn} from "typeorm";

export class AddProcessRoleDto {
    @IsNumber()
    processID: number;

    @IsNumber()
    roleID: number;
    //maybe instead of Moderator, Moderator, Moderator: Moderator, assistant Moderator ...
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