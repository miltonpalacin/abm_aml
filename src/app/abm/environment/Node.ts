import { BaseAgent } from "../agent/BaseAgent";
import { StringItem } from "../helper/StringItem";

/** Node o nodo representa al agente, lugar y la cuenta de la entidad financiera */
export class Node {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Lugar donde se estará el nodo para realizar la transacción */
    private location!: StringItem;

    private agent!: BaseAgent;

    private currentTime!: number;

    private finantialEntity!: StringItem;

    //#####################################
    // CONSTUCTOR
    //####################################

    public constructor(agent: BaseAgent) {
        this.agent = agent;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getLocation(): StringItem {
        return this.location;
    }

    public setLocation(location: StringItem): void {
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