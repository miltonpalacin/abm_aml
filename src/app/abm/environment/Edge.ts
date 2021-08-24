import { IHash } from "../helper/IHash";
import { Host } from "./Host";

/** Edge o arista representa la transacción */
export class Edge implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _startNode!: Host;

    private _endNode!: Host;

    private _currentTime!: number;

    /** Orden de creación */
    private static _orderCreate: number = 0;

    /** Código del Nodo */
    private _code!: string;


    //#####################################
    // CONSTUCTOR
    //#################################### 

    public constructor(startNode: Host, endNode: Host) {
        this._startNode = startNode;
        this._endNode = endNode;
        const code = (++Edge._orderCreate).toString().padStart(5, "0");
        this._code = "Edge_" + code;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public get startNode(): Host {
        return this._startNode;
    }

    public get endNode(): Host {
        return this._endNode;
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

    public hash(): string {
        return this.constructor.name + "." + this._startNode.code + this._endNode.code;
    }

}