import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IndividualAgent } from "../agent/IndividualAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { IMoneyData } from "../agent/Ledger";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { TypeFinantialEntity } from "../data/TypeFinantialEntity";
import { TypePlace } from "../data/TypePlace";
import { ArrayList } from "../helper/ArrayList";
import { KeyValueExtra } from "../helper/KeyValueExtra";
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

    private _args!: ITypeArgNetwork;

    public constructor(args: ITypeArgNetwork) {
        this._nodes = ArrayList.create();
        this._edges = EdgeList.create();
        this._whachList = new WhachList();
        this._args = args;
    }

    public createAgents(): void {

        /** ********************************************************* */
        /**                   CREACIÓN DE AGENTES                     */
        /** ********************************************************* */

        // Crear nodos individuales
        Host.createAgents(this._args.numPopIndivual, this._nodes, IndividualAgent);

        // Crear nodos intermediarios
        Host.createIntermediaries(this._args.numPopIntermediary, this._nodes);

        // Crear nodos empresa fines de lucro
        Host.createAgents(this._args.numPopProfitBusiness, this._nodes, ProfitBusinessAgent);

        // Crear nodos empresa sin fines de lucro
        Host.createAgents(this._args.numPopNoProfitBusiness, this._nodes, NoProfitBusinessAgent);

        // Crear nodos empresa fondo fiduciario
        Host.createAgents(this._args.numPopTrustBusiness, this._nodes, TrustFundBusinessAgent);

        // Crear nodos empresa fantasma
        Host.createAgents(this._args.numPopShellBusiness, this._nodes, ShellTypeBusinessAgent);

        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        /** ********************************************************* */
        /**                   PREDISPOSICIÓN A FRAUDE                 */
        /** ********************************************************* */

        // Asignación de predisposición al fraude 
        for (let _ = 0; _ < this._args.numPopHighPropensityFraud; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Asignación de valor predisposición alto
            agent.predispositionFraud = UtilityRandom.getRandomRange(this._args.maxPropensityFraud, Odds.rangePropensityFraud.max, 3);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud === undefined)
            .forEach(e => {
                const agent = <BaseOperationAgent>e.agent;
                // Asignación de valor predisposición baja
                agent.predispositionFraud = UtilityRandom.getRandomRange(Odds.rangePropensityFraud.min, this._args.maxPropensityFraud, 3);
            });

        /** ********************************************************* */
        /**                    WATCH LIST                             */
        /** ********************************************************* */

        arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud >= this._args.maxPropensityFraud);

        const totalInWatchList = Math.round(this._args.perPopWatchList * arraySelect.length);

        // Asignación a lista de observación
        for (let _ = 0; _ < totalInWatchList; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = arraySelect[idx].agent;

            // Agregar agente a la lista de observación 
            // 0 será el currentTime debido que aún no hay ningun Tick
            this._whachList.pushWatch(agent, 0);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

    }

    public createNetwork(): void {

        /** *************************************************************** */
        /**            ENLACES DE AGENTES ENTRE INTERMEDIARIOS              */
        /** *************************************************************** */

        let arraySelect01 = this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent));

        let totalLinked = Math.round(this._args.perLinkedIntermediary * (arraySelect01.length - 1));

        while (arraySelect01.length > 0 && totalLinked > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx01 = UtilityRandom.getRandomRange(0, arraySelect01.length - 1);

            const oneNode = arraySelect01[idx01];

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdge(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByAgent(IntermediaryAgent) < totalLinked));

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

            totalLinked = Math.ceil(UtilityRandom.getRandomRange(1, this._args.numMaxLinkedIndBusInter));

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdgeFinantial(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent)));

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

            totalLinked = Math.ceil(UtilityRandom.getRandomExp(Odds.meanDistributionExpEdge, this._args.numMaxLinkedNoIntermediary));

            const links = totalLinked - oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdge(oneNode, links, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByNoAgent(IntermediaryAgent) < totalLinked));

            arraySelect01.splice(idx01, 1);
        }

        /** ************************************************************************************ */
        /**             ENLACES DE AGENTES ENTRE INDIVIDUOS/EMPRESAS Y TRUST/SHELL               */
        /** ************************************************************************************ */

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= this._args.maxPropensityFraud)
            .forEach(e => {
                this.createEdge(e, 1, this._nodes.filter(e => e.agent.isAgent(TrustFundBusinessAgent) || e.agent.isAgent(ShellTypeBusinessAgent)));
            });

        /** ************************************************************************************ */
        /**         ENLACES DE AGENTES ENTRE INDIVIDUOS/EMPRESAS Y TRUST/SHELL - EXTRA           */
        /** ************************************************************************************ */

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= this._args.maxHighPropensityFraud)
            .forEach(e => {

                this.createEdge(e, 1, this._nodes.filter(e => e.agent.isAgent(TrustFundBusinessAgent) || e.agent.isAgent(ShellTypeBusinessAgent)));

                this.createEdge(e, 1, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>e.agent).predispositionFraud >= this._args.maxPropensityFraud));

            });
    }

    public createDepositOperacion(currentTime: number): void {

    }
    public createTransferOperation(currentTime: number): void {

        const nodesTransaction: ArrayList<Host> = ArrayList.create();

        // Individuos y empresas
        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        // Total de transacciones a realizar en diferentes agentes
        const totalExecuteTransaction = Math.ceil(this._args.perExcecuteTransaction * arraySelect.length);

        // realizar las transacciones

        // VERIFICAR SI CUENTA ESTA INCATIVADA
        for (let _ = 0; _ < totalExecuteTransaction; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);

            // Origen
            const oneNode = arraySelect[idx];
            const agentSource = <BaseOperationAgent>arraySelect[idx].agent;

            if (!agentSource.isFrozenAccounts) {
                // Si el agente tiene alta predisposición al fraude tiene alta probabilida de hacer fraude 
                // Simular que el agente decide si hacer un transacción legal o ilegal
                const isIllegal = UtilityRandom.rouletteOne(agentSource.predispositionFraud);
                // Definir el monto a transferir
                let amountTransaction = UtilityRandom.getRandomRangeMM(this._args.rangeAmountTransaction, 2);
                amountTransaction = agentSource.ledger.maxMoney(amountTransaction);

                if (amountTransaction > 0) {

                    const isIllegalMove = isIllegal ? amountTransaction >= this._args.amountSuspiciousOperation : false;

                    // Destino
                    const neighbors = oneNode.neighborsByNoAgent(IntermediaryAgent);
                    const twoNode = neighbors[UtilityRandom.getRandomRange(0, neighbors.length - 1)];
                    const agentTarge = <BaseOperationAgent>arraySelect[idx].agent;

                    // Entidades de origen y destino
                    const entities = this.sourceDestinyEntity(oneNode, twoNode);








                }
            }
            /** CUANDO ESTA MAS TIEMPO EN LA LISTA INACTIVAR LA CUENTA */

        }
        // Anañidr a wachtlist
    }


    public createWithdrawalOperation(currentTime: number): void {

        // CREAR TRANSACCIONES
        const nodesTransaction: ArrayList<Host> = ArrayList.create();


        // No eliminar las transacciones anteriores
        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        const totalExecuteTransaction = Math.ceil(this._args.perExcecuteTransaction * arraySelect.length);


        // realizar las transacciones

        // VERIFICAR SI CUENTA ESTA INCATIVADA
        for (let _ = 0; _ < totalExecuteTransaction; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);

            const oneNode = arraySelect[idx];
            const agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Si el agente tiene alta predisposición al fraude tiene alta probabilida de hacer fraude 
            // Simular que el agente decide si hacer un transacción legal o ilegal
            const isIllegal = UtilityRandom.rouletteOne(agent.predispositionFraud);

            /** CREAR ENLACES ADICIONAL PARA FORZAR TRANSACCIÓN */

            const amountTransaction = UtilityRandom.getRandomRangeMM(this._args.rangeAmountTransaction, 2);

            const isIllegalMove = isIllegal ? amountTransaction >= this._args.amountSuspiciousOperation : false;

            /** CUANDO ESTA MAS TIEMPO EN LA LISTA INACTIVAR LA CUENTA */

        }
        // Anañidr a wachtlist
    }

    //#####################################
    // MËTODOS DE APOYO
    //#####################################

    private createEdge(oneNode: Host, links: number, arraySelect02: Host[]): void {

        // Crear conexiones y vecinos
        while (links > 0) {

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

    private createEdgeFinantial(oneNode: Host, links: number, arraySelect02: Host[]): void {

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

                    const agent = <BaseOperationAgent>oneNode.agent;
                    const entity = <IntermediaryAgent>twoNode.agent;
                    const isIllegaly = UtilityRandom.rouletteOne(agent.predispositionFraud)

                    // Parte de un balance inicial
                    agent.ledger.moneyIn({

                        sourceEntity: isIllegaly ? TypeFinantialEntity.INGRESO_INFORMAL : TypeFinantialEntity.INGRESO_FORMAL,
                        targetEntity: entity.finantialEntity,
                        sourceLocation: TypePlace.DESCONOCIDO,
                        targetLocation: oneNode.location,
                        currentTime: 0,  // 0 será el currentTime debido que aún no hay ningun Tick
                        amount: UtilityRandom.getRandomRangeMM(this._args.rangeAmountTransaction, 2),
                        isIllegaly: isIllegaly

                    })

                    links--;
                }
            }

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect02.splice(idx02, 1);

        }
    }

    private sourceDestinyEntity(oneNode: Host, twoNode: Host): IntermediaryAgent[] {
        const oneEntities = oneNode.neighborsByAgent(IntermediaryAgent);
        const twoEntities = twoNode.neighborsByAgent(IntermediaryAgent);

        for (const oneEntity of oneEntities) {
            for (const twoEntity of twoEntities) {
                if (oneEntity.equal(twoEntity) || this._edges.containsNode(oneEntity, twoEntity))
                    return [(<IntermediaryAgent>oneEntity.agent), (<IntermediaryAgent>twoEntity.agent)]
            }
        }

        // Agregar nuevo enlace en caso no exista niguna coincidencia en el paso anterior
        const idx01 = UtilityRandom.getRandomRange(0, twoEntities.length - 1);
        const threeNode = twoEntities[idx01];

        this.createEdge(oneNode, 1, [threeNode]);

        return [(<IntermediaryAgent>threeNode.agent), (<IntermediaryAgent>threeNode.agent)]

    }

}