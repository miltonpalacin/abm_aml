import { BaseAgent } from "../agent/BaseAgent";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";

/** Node o nodo representa al agente, lugar y la cuenta de la entidad financiera */
export class Node {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Lugar donde estará el nodo para realizar la transacción */
    private location!: KeyValue<String, String>;

    /** Agente dueño del agent */
    private agent!: BaseAgent;

    /** Tiempo actual, que se actualiza en todas las iteraciones */
    private currentTime!: number;

    /** El nodo esta asociado a una cuenta de una entidada financiera  */
    // private finantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;


    //#####################################
    // CONSTUCTOR
    //####################################

    public constructor(agent: BaseAgent) {
        this.agent = agent;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getLocation(): KeyValue<String, String> {
        return this.location;
    }

    public setLocation(location: KeyValue<String, String>): void {
        this.location = location;
    }

    public getAgent(): BaseAgent {
        return this.agent;
    }

    public getCurrentTime(): number {
        return this.currentTime;
    }

    public setCurrentTime(currentTime: number): void {
        this.currentTime = currentTime;
    }

}