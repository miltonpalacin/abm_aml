import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";
import { BaseAgent } from "./BaseAgent";

export class NaturalAgent extends BaseAgent {


    /** Cuentas en la entidad financiera */
    private accountFinantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>[];

    private isInWatchList!: boolean;

    private isFrozenAccounts!: boolean;

    public build(): this {
        throw new Error("Method not implemented.");
    }

}