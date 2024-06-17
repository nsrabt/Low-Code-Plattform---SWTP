import { PDFDocument } from 'pdf-lib';
import {Field} from "../workflow/Field";
import {roles} from "../database/roles";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class WorkflowElement {
    @PrimaryGeneratedColumn()
    private _id: number;
    @Column()
    private _pdfDocument: PDFDocument;
    @Column()
    private _fields: Field[];
    @Column()
    private _access: roles[];
    @Column()
    private _stepNumber: number;

}






    /*
    constructor(pdfDocument: PDFDocument, access: Role[], stepNumber:number, fieldAccess: Role[][], attributes: number[]) {
        this._pdfDocument = pdfDocument;
        this._access= access;
        this._stepNumber = stepNumber;

        //Create Field-Objects
        let fields = pdfDocument.getForm().getFields();
        for( let i=0; i< fields.length; i++){
            let curField:Field;
            let type:string = typeof fields[i];
            curField = new Field(fields[i],fields[i].getName(),attributes[i],fieldAccess[i],type);
        }


    }


    loadFromDataBase(id:number){

    }

    get fields(): Field[] {
        return this._fields;
    }
    set fields(value: Field[]) {
        this._fields = value;
    }

    get pdfDocument(): PDFDocument {
        return this._pdfDocument;
    }
    set pdfDocument(value: PDFDocument) {
        this._pdfDocument = value;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get stepNumber(): number {
        return this._stepNumber;
    }
    set stepNumber(value: number) {
        this._stepNumber = value;
    }

    get accessRoles(): Role[] {
        return this._access;
    }
    set accessRoles(value: Role[]) {
        this._access = value;
    }








}     */