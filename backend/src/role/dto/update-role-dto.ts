// create-user.dto.ts
import {IsString, IsNumber, IsArray, IsBoolean, isBoolean} from 'class-validator';

export class UpdateRoleDto {
    @IsString()
    roleName: string;

    @IsNumber()
    platformID: number;

    @IsArray()
    @IsBoolean({each: true})
    permissions: boolean[];

    @IsBoolean()
    isDefault: boolean
}
