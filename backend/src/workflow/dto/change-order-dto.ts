import {IsNumber} from "class-validator";

export class ChangeOrderDto{
    @IsNumber()
    stepID: number;

    @IsNumber()
    stepNumber: number;
}