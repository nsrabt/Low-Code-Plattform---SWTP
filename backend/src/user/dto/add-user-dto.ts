// create-user.dto.ts
import {IsString, IsEmail, isNumber, IsNumber} from 'class-validator';

export class AddUserDto {
    @IsString()
    username: string;

    @IsEmail()
    eMail: string;

    @IsString()
    name: string;

}
