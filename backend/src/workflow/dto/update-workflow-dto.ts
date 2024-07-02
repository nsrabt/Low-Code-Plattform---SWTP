import {IsArray, IsBoolean, IsNumber, IsString} from "class-validator";

export class UpdateWorkflowDto{
    @IsNumber()
    processID: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    //can a user just start it or does he need to apply for it?
    @IsBoolean()
    isOpen: boolean;

}