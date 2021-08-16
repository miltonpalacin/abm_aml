import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";

export class Transaction {

    private sourceNode!: Node;

    private destinyNode!: Node;

    private sourceEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    private destinyEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;
    
    private isSourceInWatchList!: boolean;

    private isDestinyInWatchList!: boolean;

    private typeMove!: KeyValue<string, string>;

    private isMoveIlegally!: boolean;

    private amount!: number;

    private currentTime!: number;
}