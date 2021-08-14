import { IHash } from "./IHash";

/**
 * Clase KeyValue o Código Descripción
 */
export class CodeDescription implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Código */
    private code: string;

    /** Descripción */
    private description: string;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
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
