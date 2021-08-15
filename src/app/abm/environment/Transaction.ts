import { KeyValue } from "../helper/KeyValue";

export class Transaction {

    private startNode!: Node;

    private endNode!: Node;

    // sourceEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    // targetEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    // sourcePlace: KeyValue<String, String>;
    // targetPlace: KeyValue<String, String>;

    private typeMove!: KeyValue<string, string>;

    private isMoveIlegally!: boolean;

    private amount!: number;

    private currentTime!: number;
}