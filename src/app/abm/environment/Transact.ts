import { IHash } from "../helper/IHash";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";
import { Host } from "./Host";

export class Transact implements IHash {

    sourceNode!: Host | undefined;

    destinyNode!: Host | undefined;

    sourceEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    destinyEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    isSourceInWatchList!: boolean;

    isDestinyInWatchList!: boolean;

    typeMove!: KeyValue<string, string>;

    isIlegally!: boolean;

    amount!: number;

    currentTime!: number;

    /** Orden de creación */
    static _orderCreate: number = 0;

    /** Código del Nodo */
    private _code!: string;

    public constructor() {
        const code = (++Transact._orderCreate).toString().padStart(7, "0");
        this._code = "T_" + code;
    }

    public hash(): string {
        return this.constructor.name + "." + this._code;
    }
}