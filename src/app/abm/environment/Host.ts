import { BaseAgent } from "../agent/BaseAgent";
import { TypePlace } from "../data/TypePlace";
import { ArrayList } from "../helper/ArrayList";
import { IHash } from "../helper/IHash";
import { KeyValue } from "../helper/KeyValue";
import { UtilityRandom } from "../odd/UtilityRandom";

/** Node o nodo representa al agente, lugar y la cuenta de la entidad financiera */
export class Host implements IHash {

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
        this.code = "Nodo_" + (++Host.orderCreate);
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

    //#####################################
    // MËTODOS
    //####################################

    public static createAgents<T extends BaseAgent>(total: number, nodes: ArrayList<Host>, type: { new(): T; }): void {

        // Creando nodo individuales
        for (let _ = 0; _ < total; _++) {
            // Crear agente
            let agent = new type()
            agent.build();
            agent.setLocation(UtilityRandom.getRandomOfKeyValue(TypePlace.data))
            agent.setCurrentState(agent.getInitialState());

            // Crear node
            let node = new Host(agent);
            node.setCurrentTime(0);
            node.setLocation(UtilityRandom.getRandomOfKeyValue(TypePlace.data));

            // Agregando a la red
            nodes.push(node);

        }

    }

}