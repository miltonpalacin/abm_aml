import { IHash } from "../helper/IHash";
import { Host } from "./Host";

/** Edge o arista representa la transacción */
export class Edge {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _oneNode!: Host;

    private _twoNode!: Host;

    private _currentTime!: number;

    /** Orden de creación */
    private static _orderCreate: number = 0;

    /** Código del Nodo */
    private _code!: string;


    //#####################################
    // CONSTUCTOR
    //#################################### 

    public constructor(oneNode: Host, twoNode: Host) {
        this._oneNode = oneNode;
        this._twoNode = twoNode;
        const code = (++Edge._orderCreate).toString().padStart(5, "0");
        this._code = "Edge_" + code;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public get oneNode(): Host {
        return this._oneNode;
    }

    public get twoNode(): Host {
        return this._twoNode;
    }

    public get currentTime(): number {
        return this._currentTime;
    }
    public set currentTime(value: number) {
        this._currentTime = value;
    }

    public get code(): string {
        return this._code;
    }

    //#####################################
    // MÉTODOS
    //#################################### 

    // public hash(): string {
    //     return this.constructor.name + "." + this.oneNode.code + this.twoNode.code;
    // }

    public equal(edge: Edge): boolean {
        const code = edge.oneNode.code + "." + edge.twoNode.code;
        return (code === (this.oneNode.code + "." + this.twoNode.code)) || (code === (this.twoNode.code + "." + this.oneNode.code));
    }

    public equalNode(oneNode: Host, twoNode: Host): boolean {
        const code = oneNode.code + "." + twoNode.code;
        return (code === (this.oneNode.code + "." + this.twoNode.code)) || (code === (this.twoNode.code + "." + this.oneNode.code));
    }

}