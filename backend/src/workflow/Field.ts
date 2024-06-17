import {PDFField} from 'pdf-lib'
import { roles } from "../database/roles";
export class Field{
    get fieldType(): string {
        return this._fieldType;
    }

    set fieldType(value: string) {
        this._fieldType = value;
    }
    private _field: PDFField;
    private _fieldName: string;
    private _attributeID: number;
    private _access: roles[];
    private _fieldType: string;

    constructor(field: PDFField, fieldName: string, attributeID: number, access: roles[], fieldType: string) {
        this._field = field;
        this._fieldName = fieldName;
        this._attributeID = attributeID;
        this._access = access;
        this._fieldType = fieldType;
    }

    // Getter und Setter für field
    public get field(): PDFField {
        return this._field;
    }

    public set field(value: PDFField) {
        this._field = value;
    }

    // Getter und Setter für fieldName
    public get fieldName(): string {
        return this._fieldName;
    }

    public set fieldName(value: string) {
        this._fieldName = value;
    }

    // Getter und Setter für attributeID
    public get attributeID(): number {
        return this._attributeID;
    }
    public set attributeID(value: number) {
        this._attributeID = value;
    }

    // Getter und Setter für access
    public get access(): roles[] {
        return this._access;
    }

    public set access(value: roles[]) {
        this._access = value;
    }

}


