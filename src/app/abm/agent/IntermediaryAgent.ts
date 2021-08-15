import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";
import { BaseAgent } from "./BaseAgent";

export class IntermediaryAgent extends BaseAgent {

    /** El nodo esta asociado a una cuenta de una entidada financiera  */
    private finantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    public build(): this {
        throw new Error("Method not implemented.");
    }
}