import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";
import { Edge } from "./Edge";

export class EdgeFinantialEntity extends Edge {

    /** El nodo esta asociado a una cuenta de una entidada financiera  */
    private finantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    private baseAmount!: number;


}