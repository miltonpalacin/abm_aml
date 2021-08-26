import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IndividualAgent } from "../agent/IndividualAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { ArrayList } from "../helper/ArrayList";
import { ITypeArgNetwork } from "../helper/Types";
import { Odds } from "../odd/Odds";
import { UtilityRandom } from "../odd/UtilityRandom";
import { Edge } from "./Edge";
import { EdgeList } from "./EdgeList";
import { Host } from "./Host";
import { WhachList } from "./WhatchList";

export class Network {

    private _nodes!: ArrayList<Host>;

    private _edges!: EdgeList;

    private _whachList!: WhachList;

    public constructor() {
        this._nodes = ArrayList.create();
        this._edges = EdgeList.create();
        this._whachList = new WhachList();
    }

    public createAgents(args: ITypeArgNetwork, currentTime: number): void {

        /** ********************************************************* */
        /**                   CREACIÓN DE AGENTES                     */
        /** ********************************************************* */

        // Crear nodos individuales
        Host.createAgents(args.numPopIndivual, this._nodes, IndividualAgent);

        // Crear nodos intermediarios
        Host.createIntermediaries(args.numPopIntermediary, this._nodes);

        // Crear nodos empresa fines de lucro
        Host.createAgents(args.numPopProfitBusiness, this._nodes, ProfitBusinessAgent);

        // Crear nodos empresa sin fines de lucro
        Host.createAgents(args.numPopNoProfitBusiness, this._nodes, NoProfitBusinessAgent);

        // Crear nodos empresa fondo fiduciario
        Host.createAgents(args.numPopTrustBusiness, this._nodes, TrustFundBusinessAgent);

        // Crear nodos empresa fantasma
        Host.createAgents(args.numPopShellBusiness, this._nodes, ShellTypeBusinessAgent);

        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        /** ********************************************************* */
        /**                   PREDISPOSICIÓN A FRAUDE                 */
        /** ********************************************************* */

        // Asignación de predisposición al fraude 
        for (let _ = 0; _ < args.numPopHighPropensityFraud; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Asignación de valor predisposición alto
            agent.predispositionFraud = UtilityRandom.getRandomRange(args.maxPropensityFraud, Odds.rangePropensityFraud.max, 3);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud === undefined)
            .forEach(e => {
                const agent = <BaseOperationAgent>e.agent;
                // Asignación de valor predisposición baja
                agent.predispositionFraud = UtilityRandom.getRandomRange(Odds.rangePropensityFraud.min, args.maxPropensityFraud, 3);
            });

        /** ********************************************************* */
        /**                    WATCH LIST                             */
        /** ********************************************************* */

        arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud >= args.maxPropensityFraud);

        const totalInWatchList = Math.round(args.perPopWatchList * arraySelect.length);

        // Asignación a lista de observación
        for (let _ = 0; _ < totalInWatchList; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Agregar agente a la lista de observación
            this._whachList.pushWatch(agent, currentTime);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

    }

    public createNetwork(args: ITypeArgNetwork, currentTime: number): void {

        /** *************************************************************** */
        /**            ENLACES DE AGENTES ENTRE INTERMEDIARIOS              */
        /** *************************************************************** */

        let arraySelect01 = this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent));

        let totalLinked = Math.round(args.perLinkedIntermediary * (arraySelect01.length - 1));

        while (arraySelect01.length > 0 && totalLinked > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx01 = UtilityRandom.getRandomRange(0, arraySelect01.length - 1);

            const oneNode = arraySelect01[idx01];

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createConnections(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByAgent(IntermediaryAgent) < totalLinked));

            arraySelect01.splice(idx01, 1);
        }

        /** ************************************************************************************ */
        /**            ENLACES DE AGENTES ENTRE INTERMEDIARIOS Y INDIVIDUOS/EMPRESAS             */
        /** ************************************************************************************ */

        arraySelect01 = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        while (arraySelect01.length > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx01 = UtilityRandom.getRandomRange(0, arraySelect01.length - 1);

            const oneNode = arraySelect01[idx01];

            totalLinked = Math.ceil(UtilityRandom.getRandomRange(1, args.numMaxLinkedIndBusInter));

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createConnections(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent)));

            arraySelect01.splice(idx01, 1);
        }

        /** ************************************************************************************ */
        /**                    ENLACES DE AGENTES ENTRE INDIVIDUOS Y EMPRESAS                    */
        /** ************************************************************************************ */

        arraySelect01 = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        while (arraySelect01.length > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx01 = UtilityRandom.getRandomRange(0, arraySelect01.length - 1);

            const oneNode = arraySelect01[idx01];

            totalLinked = Math.ceil(UtilityRandom.getRandomExp(Odds.meanDistributionExpEdge, args.numMaxLinkedNoIntermediary));

            const links = totalLinked - oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

            if (links > 0)
                this.createConnections(oneNode, links, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByNoAgent(IntermediaryAgent) < totalLinked));

            arraySelect01.splice(idx01, 1);
        }

        /** ************************************************************************************ */
        /**             ENLACES DE AGENTES ENTRE INDIVIDUOS/EMPRESAS Y TRUST/SHELL               */
        /** ************************************************************************************ */

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= args.maxPropensityFraud)
            .forEach(e => {
                this.createConnections(e, 1, this._nodes.filter(e => e.agent.isAgent(TrustFundBusinessAgent) || e.agent.isAgent(ShellTypeBusinessAgent)));
            });

        /** ************************************************************************************ */
        /**         ENLACES DE AGENTES ENTRE INDIVIDUOS/EMPRESAS Y TRUST/SHELL - EXTRA           */
        /** ************************************************************************************ */

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= args.maxHighPropensityFraud)
            .forEach(e => {

                this.createConnections(e, 1, this._nodes.filter(e => e.agent.isAgent(TrustFundBusinessAgent) || e.agent.isAgent(ShellTypeBusinessAgent)));

                this.createConnections(e, 1, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= args.maxPropensityFraud));

            });
    }


    //#####################################
    // MËTODOS DE APOYO
    //####################################

    private createConnections(oneNode: Host, links: number, arraySelect02: Host[]): void {

        // Crear conexiones y vecinos
        while (links > 0) {
            //for (let _ = 0; _ < links; _++) {

            if (arraySelect02.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx02 = UtilityRandom.getRandomRange(0, arraySelect02.length - 1);
            const twoNode = arraySelect02[idx02];

            if (!oneNode.equal(twoNode)) {

                const edge = new Edge(oneNode, twoNode)

                if (!this._edges.contains(edge)) {

                    // Crear vecinos nuevos
                    oneNode.neighbors.push(twoNode);
                    twoNode.neighbors.push(oneNode);

                    // Agregar enlace/edge

                    this._edges.push(new Edge(oneNode, twoNode));
                    links--;
                }
            }

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect02.splice(idx02, 1);

        }
    }

}