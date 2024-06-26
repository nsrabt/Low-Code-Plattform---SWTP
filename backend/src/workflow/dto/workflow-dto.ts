import {IsArray, IsDefined, IsNumber, IsString} from "class-validator";

export class WorkflowDto {
    @IsNumber()
    process_id: number;
    @IsString()
    title: string;

    @IsArray()
    @IsDefined()
    document: Uint8Array;
}