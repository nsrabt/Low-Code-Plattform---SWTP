import {IsArray, IsBoolean, IsDefined, IsNumber, IsString} from "class-validator";

export class WorkflowDto {
    @IsNumber()
    platform_id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    isOPen: boolean;


}