import { BaseAgent } from "../agent/BaseAgent";
import { IHash } from "../helper/IHash";
import { KeyValue } from "../helper/KeyValue";

/** Node o nodo representa al agente, lugar y la cuenta de la entidad financiera */
export class Node implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Lugar donde estará el nodo para realizar la transacción */
    private location!: KeyValue<String, String>;

    /** Agente dueño del agent */
    private agent!: BaseAgent;

    /** Tiempo actual, que se actualiza en todas las iteraciones */
    private currentTime!: number;

    /** Orden de creación */
    private static orderCreate: number = 0;

    /** Código del Nodo */
    private code!: string;

    //#####################################
    // CONSTUCTOR
    //####################################

    public constructor(agent: BaseAgent) {
        this.agent = agent;
        this.code = "Nodo_" + (++Node.orderCreate);
        this.agent.setNodeAddress(this.code);

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

    public hash(): string {
        return this.constructor.name + "." + this.code;
    }

}