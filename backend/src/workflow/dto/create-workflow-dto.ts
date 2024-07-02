import {IsArray, IsBoolean, IsDefined, IsNumber, IsString} from "class-validator";

export class CreateWorkflowDto {
    //Always zero
    @IsNumber()
    platform_id: number;
    //for example: Bachelorarbeit anmelden
    @IsString()
    title: string;
    @IsString()
    description: string;
    //can a user just start it or does he need to apply for it?
    @IsBoolean()
    isOpen: boolean;


}