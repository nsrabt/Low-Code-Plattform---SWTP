// create-user.dto.ts
import {IsString, IsEmail, isNumber, IsNumber} from 'class-validator';

export class UpdateUserDto {

    @IsString()
    username: string;

    @IsEmail()
    eMail: string;

    @IsString()
    profilePicture: string;

    @IsString()
    name: string;
}
