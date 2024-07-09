import {IsNumber, IsString} from "class-validator";

export class UpdateStepDto{
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    data:string;
}