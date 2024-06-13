// create-user.dto.ts
import {IsString, IsEmail, isNumber, IsNumber} from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    eMail: string;

    @IsString()
    profilePicture: string;

    @IsNumber()
    platformID: number;
}
