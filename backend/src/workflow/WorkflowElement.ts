import { PDFDocument } from 'pdf-lib'
import {Field} from "./Field";
import {roles} from "../database/workflow/roles";
import {step} from "../database/workflow/step";
export class WorkflowElement{
    id: number;
    document: PDFDocument;
    fields: Field[];
    access: roles[]
    stepNumber: number;

    constructor(id: number, stepNumber: number) {
        this.id = id;
        this.stepNumber = stepNumber;
        //get all the data from

    }

    setDocument(document: PDFDocument){
        this.document = document;
    }
    addField(field: Field){
        this.fields.push(field);
    }
    setFields(fields: Field[]){
        this.fields = fields;
    }

}