import {IsBoolean, IsNumber, IsString} from "class-validator";

export class StepDto {
    @IsString()
    title: string;
    @IsNumber()
    description: string;
    @IsNumber()
    platform_id: number;
    @IsBoolean()
    isOpen: boolean;
}