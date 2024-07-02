import {IsArray, IsBoolean, IsNumber, IsString} from "class-validator";

export class StepDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    document: string;

    @IsNumber()
    step_number: number;

}