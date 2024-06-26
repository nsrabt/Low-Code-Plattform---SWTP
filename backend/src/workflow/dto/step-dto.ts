import {IsArray, IsBoolean, IsNumber, IsString} from "class-validator";

export class StepDto {
    @IsNumber()
    process_id: number;

    @IsString()
    title: string;

    @IsString
    document: string;

    @IsNumber
    step_number: number;

    @IsArray
    role_ids: number[];

}