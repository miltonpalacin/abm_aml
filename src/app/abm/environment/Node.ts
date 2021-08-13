import { BaseAgent } from "../agent/BaseAgent";
import { FinantialEntity } from "./FinantialEntity";
import { Place } from "./Place";

/** Node o nodo representa al agente, lugar y la cuenta de la entidad financiera */
export class Node {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Lugar donde se estará el nodo para realizar la transacción */
    private location!: Place;

    private agent!: BaseAgent;

    private currentTime!: number;

    private entity!: FinantialEntity;

    //#####################################
    // CONSTUCTOR
    //####################################

    public constructor(agent: BaseAgent) {
        this.agent = agent;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getLocation(): Place {
        return this.location;
    }

    public setLocation(location: Place): void {
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