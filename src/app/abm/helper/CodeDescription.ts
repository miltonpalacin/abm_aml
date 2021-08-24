import { IHash } from "./IHash";

/**
 * Clase KeyValue o Código Descripción
 */
export class CodeDescription implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Código */
    private _code: string;

    /** Descripción */
    private _description: string;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor(code: string, description: string) {
        this._code = code;
        this._description = description;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public get code(): string {
        return this._code;
    }
    
    public set code(value: string) {
        this._code = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    //#####################################
    // MÉTODOS
    //####################################

    public equals(o: any): boolean {
        if (this === o) return true;
        if (o == null || this.constructor.name !== o.constructor.name) return false;
        const obj: CodeDescription = <CodeDescription>o;
        return this.code === obj.code;
    }

    public toString(): string {

        return "CodeDescription {code=\'" + this.code + '\'' + ", description=\'" + this.description + '\'' + '}';
    }

    public hash(): string {
        return this.constructor.name + "." + this.code;
    }

}
