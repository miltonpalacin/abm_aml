import { BaseAgent } from "../agent/BaseAgent";
import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { TypeFinantialEntity } from "../data/TypeFinantialEntity";
import { TypePlace } from "../data/TypePlace";
import { ArrayList } from "../helper/ArrayList";
import { IHash } from "../helper/IHash";
import { KeyValue } from "../helper/KeyValue";
import { UtilityRandom } from "../odd/UtilityRandom";

/** Node o nodo que representa al agente, lugar y la cuenta de la entidad financiera */
export class Host implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Lugar donde estará el nodo para realizar la transacción */
    private _location!: KeyValue<String, String>;

    /** Agente dueño del agent */
    private _agent!: BaseAgent;

    /** Tiempo actual, que se actualiza en todas las iteraciones */
    private _currentTime!: number;

    private _neighbors!: ArrayList<Host>;

    /** Orden de creación */
    private static _orderCreate: number = 0;

    /** Código del Nodo */
    private _code!: string;

    //#####################################
    // CONSTUCTOR
    //####################################

    public constructor(agent: BaseAgent) {
        this._agent = agent;
        const code = (++Host._orderCreate).toString().padStart(5, "0");
        this._code = "Nodo_" + code;
        this._agent.nodeAddress = this.code;
        this._neighbors = ArrayList.create();
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public get location(): KeyValue<String, String> {
        return this._location;
    }

    public set location(value: KeyValue<String, String>) {
        this._location = value;
    }

    public get agent(): BaseAgent {
        return this._agent;
    }

    public get currentTime(): number {
        return this._currentTime;
    }

    public set currentTime(value: number) {
        this._currentTime = value;
    }

    public get code(): string {
        return this._code;
    }

    //#####################################
    // MËTODOS
    //####################################

    public static createAgents<T extends BaseOperationAgent>(total: number, nodes: ArrayList<Host>, type: { new(): T; }): void {

        // Creando nodo individuales
        for (let _ = 0; _ < total; _++) {
            // Crear agente
            let agent = new type()
            agent.build();
            agent.place = UtilityRandom.randomOfKeyValue(TypePlace.data);
            agent.currentState = agent.initialState;

            // Crear node
            let node = new Host(agent);
            node.currentTime = 0;
            node.location = UtilityRandom.randomOfKeyValue(TypePlace.data);

            // Agregando a la red
            nodes.push(node);

        }

    }

    public static createIntermediaries(total: number, nodes: ArrayList<Host>): void {

        const data = TypeFinantialEntity.data.clone();
        let idx: number = -1;

        // Creando nodo individuales
        for (let _ = 0; _ < total; _++) {
            // Crear agente
            let agent = new IntermediaryAgent()
            agent.build();
            agent.place = UtilityRandom.randomOfKeyValue(TypePlace.data);
            agent.currentState = agent.initialState;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            // Seleccionar entidad financiera
            idx = UtilityRandom.randomRange(0, data.length - 1);
            agent.finantialEntity = data.getByIndex(idx);

            // Crear node
            let node = new Host(agent);
            node.currentTime = 0;
            node.location = UtilityRandom.randomOfKeyValue(TypePlace.data);

            // Agregando a la red
            nodes.push(node);

            data.deleteByIndex(idx);

        }

    }

    public hash(): string {
        return this.constructor.name + "." + this._agent.code;
    }

    public equal(node: Host): boolean {
        return node.agent.equal(this._agent);
    }

    //#####################################
    // NEIGHBORDS
    //####################################

    public get neighbors(): ArrayList<Host> {
        return this._neighbors;
    }

    public totalNeighbors(): number {
        return this._neighbors.length;
    }

    public totalNeighborsByAgent<T>(type: { new(): T; }): number {
        return this._neighbors.filter(e => e.agent.isAgent(type)).length;
    }

    public neighborsByAgent<T>(type: { new(): T; }): Host[] {
        return this._neighbors.filter(e => e.agent.isAgent(type));
    }

    public totalNeighborsByNoAgent<T>(type: { new(): T; }): number {
        return this._neighbors.filter(e => !e.agent.isAgent(type)).length;
    }

    public neighborsByNoAgent<T>(type: { new(): T; }): Host[] {
        return this._neighbors.filter(e => !e.agent.isAgent(type));
    }

    public totalNeighborsBusiness(): number {
        return this._neighbors.filter(e =>
            e.agent.isAgent(ProfitBusinessAgent) ||
            e.agent.isAgent(NoProfitBusinessAgent) ||
            e.agent.isAgent(ShellTypeBusinessAgent) ||
            e.agent.isAgent(TrustFundBusinessAgent)
        ).length;
    }
}