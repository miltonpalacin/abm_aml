import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IndividualAgent } from "../agent/IndividualAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { ArrayList } from "../helper/ArrayList";
import { ITypeCreateAgent } from "../helper/Types";
import { Odds } from "../odd/Odds";
import { UtilityRandom } from "../odd/UtilityRandom";
import { Edge } from "./Edge";
import { Host } from "./Host";
import { WhachList } from "./WhatchList";

export class Network {

    private _nodes!: ArrayList<Host>;

    private _edges!: ArrayList<Edge>;

    private _whachList!: WhachList;

    public constructor() {
        this._nodes = ArrayList.create();
        this._edges = ArrayList.create();
        this._whachList = new WhachList();
    }

    public createAgents(args: ITypeCreateAgent, currentTime: number): void {

        /** ********************************************************* */
        /**                   CREACIÓN DE AGENTES                     */
        /** ********************************************************* */

        // Crear nodos individuales
        Host.createAgents(args.popIndivual, this._nodes, IndividualAgent);

        // Crear nodos intermediarios
        Host.createAgents(args.popIntermediary, this._nodes, IntermediaryAgent);

        // Crear nodos empresa fines de lucro
        Host.createAgents(args.popProfitBusiness, this._nodes, ProfitBusinessAgent);

        // Crear nodos empresa sin fines de lucro
        Host.createAgents(args.popNoProfitBusiness, this._nodes, NoProfitBusinessAgent);

        // Crear nodos empresa fondo fiduciario
        Host.createAgents(args.popTrustBusiness, this._nodes, TrustFundBusinessAgent);

        // Crear nodos empresa fantasma
        Host.createAgents(args.popShellBusiness, this._nodes, ShellTypeBusinessAgent);

        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        /** ********************************************************* */
        /**                   PREDISPOSICIÓN A FRAUDE                 */
        /** ********************************************************* */

        // Asignación de predisposición al fraude 
        for (let _ = 0; _ < args.popHighPropensityFraud; _++) {

            if (arraySelect.length <= 0) continue;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            let agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Asignación de valor predisposición alto
            agent.predispositionFraud = UtilityRandom.getRandomRange(args.maxPropensityFraud, Odds.rangePropensityFraud.max, 2);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud === undefined)
            .forEach(e => {
                let agent = <BaseOperationAgent>e.agent;
                // Asignación de valor predisposición baja
                agent.predispositionFraud = UtilityRandom.getRandomRange(Odds.rangePropensityFraud.min, args.maxPropensityFraud, 2);
            });

        /** ********************************************************* */
        /**                    WATCH LIST                             */
        /** ********************************************************* */

        arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud >= args.maxPropensityFraud);

        const totalInWatchList = Math.round(args.popWatchList * arraySelect.length);

        // Asignación a lista de observación
        for (let _ = 0; _ < totalInWatchList; _++) {

            if (arraySelect.length <= 0) continue;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            let agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Agregar agente a la lista de observación
            this._whachList.pushWatch(agent, currentTime);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

    }

    public createNetwork(): void {
        // Creación de conexiones
    }

}