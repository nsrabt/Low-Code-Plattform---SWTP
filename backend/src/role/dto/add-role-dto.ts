// create-user.dto.ts
import {IsString, IsNumber, IsArray, IsBoolean, isBoolean} from 'class-validator';

export class AddRoleDto {
    @IsString()
    roleName: string;

    @IsNumber()
    platformID: number;

    @IsArray()
    @IsBoolean({each: true})
    permissions: boolean[];

    @IsString()
    profilePicture: string;

    @IsBoolean()
    isDefault: boolean
}
