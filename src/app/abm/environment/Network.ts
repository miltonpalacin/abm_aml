import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IndividualAgent } from "../agent/IndividualAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { TypeFinantialEntity } from "../data/TypeFinantialEntity";
import { TypeOperation } from "../data/TypeOperation";
import { TypePlace } from "../data/TypePlace";
import { ArrayList } from "../helper/ArrayList";
import { ITypeArgNetwork } from "../helper/Types";
import { Odds } from "../odd/Odds";
import { UtilityRandom } from "../odd/UtilityRandom";
import { Edge } from "./Edge";
import { EdgeList } from "./EdgeList";
import { Host } from "./Host";
import { Transact } from "./Transact";
import { WhachList } from "./WhatchList";

export class Network {

    private _nodes!: ArrayList<Host>;

    private _edges!: EdgeList;

    private _whachList!: WhachList;

    private _transactions!: ArrayList<Transact>;

    private _args!: ITypeArgNetwork;

    public constructor(args: ITypeArgNetwork) {
        this._nodes = ArrayList.create();
        this._edges = EdgeList.create();
        this._transactions = ArrayList.create();
        this._args = args;
        this._whachList = new WhachList(args.maxTimesWatchList, args.maxTimesCleanWatchList);
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
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = <BaseOperationAgent>arraySelect[idx].agent;

            // Asignación de valor predisposición alto
            agent.predispositionFraud = UtilityRandom.randomRange(this._args.maxPropensityFraud, Odds.rangePropensityFraud.max, 3);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

        this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.agent).predispositionFraud === undefined)
            .forEach(e => {
                const agent = <BaseOperationAgent>e.agent;
                // Asignación de valor predisposición baja
                agent.predispositionFraud = UtilityRandom.randomRange(Odds.rangePropensityFraud.min, this._args.maxPropensityFraud, 3);
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
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);
            // Sacar el agente
            const agent = arraySelect[idx].agent;

            // Agregar agente a la lista de observación 
            // 0 será el currentTime debido que aún no hay ningun Tick
            this._whachList.pushWatchFrozen(agent, 0);

            // Quitar del arreglo para no considerarlo en la siguiente iteración
            arraySelect.splice(idx, 1);

        }

    }

    public createNetwork(): void {

        /** *************************************************************** */
        /**            ENLACES DE AGENTES ENTRE INTERMEDIARIOS              */
        /** *************************************************************** */

        let arraySelect = this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent));

        let totalLinked = Math.round(this._args.perLinkedIntermediary * (arraySelect.length - 1));

        while (arraySelect.length > 0 && totalLinked > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            const oneNode = arraySelect[idx];

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdge(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByAgent(IntermediaryAgent) < totalLinked));

            arraySelect.splice(idx, 1);
        }

        /** ************************************************************************************ */
        /**            ENLACES DE AGENTES ENTRE INTERMEDIARIOS Y INDIVIDUOS/EMPRESAS             */
        /** ************************************************************************************ */

        arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        while (arraySelect.length > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            const oneNode = arraySelect[idx];

            totalLinked = Math.ceil(UtilityRandom.randomRange(1, this._args.numMaxLinkedIndBusInter));

            const links = totalLinked - oneNode.totalNeighborsByAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdgeFinantial(oneNode, links, this._nodes.filter(e => e.agent.isAgent(IntermediaryAgent)));

            arraySelect.splice(idx, 1);
        }

        /** ************************************************************************************ */
        /**                    ENLACES DE AGENTES ENTRE INDIVIDUOS Y EMPRESAS                    */
        /** ************************************************************************************ */

        arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        while (arraySelect.length > 0) {

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            const oneNode = arraySelect[idx];

            totalLinked = Math.ceil(UtilityRandom.randomExp(Odds.meanDistributionExpEdge, this._args.numMaxLinkedNoIntermediary));

            const links = totalLinked - oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

            if (links > 0)
                this.createEdge(oneNode, links, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) && e.totalNeighborsByNoAgent(IntermediaryAgent) < totalLinked));

            arraySelect.splice(idx, 1);
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

        // Individuos y empresas
        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        // Total de transacciones a realizar en diferentes agentes
        const totalExecuteDeposit = Math.ceil(this._args.perExcecuteDeposit * arraySelect.length);

        // realizar las transacciones
        for (let _ = 0; _ < totalExecuteDeposit; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            // NODO ORIGEN
            const oneNode = arraySelect[idx];
            const agentSource = <BaseOperationAgent>oneNode.agent;

            if (!agentSource.isFrozenAccounts) {

                // Definir el monto a transferir
                const amountTransaction = UtilityRandom.randomRangeMM(this._args.rangeAmountTransaction, 2);

                if (amountTransaction > 0) {

                    // Si el agente tiene alta predisposición al fraude tiene alta probabilidad realizar un movimiento ilícito
                    // Simular que el agente DECIDE si hacer un transacción legal o ilegal
                    const isStructure = UtilityRandom.roulettePerOne(agentSource.predispositionFraud);

                    const isObserved = amountTransaction >= this._args.amountSuspiciousOperation;

                    if ((agentSource.predispositionFraud >= this._args.maxPropensityFraud && isObserved && isStructure)) {

                        /** ************************************************* */
                        /**        TRANSACCIÓN COMPLEJA FRAUDULENTA           */
                        /** ************************************************* */

                        // Complex/Fraund/structure
                        const totalNeighbors = oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

                        // Re-estructura de la transacción.
                        const structure = this.structureAmount(amountTransaction);
                        if (structure.length > totalNeighbors) this.createNewNeighbors(oneNode, structure.length - totalNeighbors)

                        const selectNeighbors = oneNode.neighborsByNoAgent(IntermediaryAgent);

                        structure.some(amount => {

                            /** ************************************************* */
                            /**       EJECUTAR ESTRUCTURA DE TRANSFERENCIAS       */
                            /** ************************************************* */

                            if (selectNeighbors.length <= 0) return;

                            // Elegir de manera aleatoria un índice del arreglo de nodos
                            const idx = UtilityRandom.randomRange(0, selectNeighbors.length - 1);

                            // Seleccionar un tercer participante
                            const threeNode = selectNeighbors[idx];

                            // Transferencia fraudalenta/ilegal e indireacta: DEPOSITO
                            this.doDeposit(threeNode, currentTime, amountTransaction, true, false);

                            // Transferencia para consolidar los montos en el destino
                            this.doTransfer(threeNode, oneNode, currentTime, amount, true, false);
                        });

                    }
                    else
                        /** ************************************************* */
                        /**             TRANSACCIÓN SIMPLE LEGAL              */
                        /** ************************************************* */
                        // Transferencia legal
                        this.doDeposit(oneNode, currentTime, amountTransaction, false, isObserved);


                }
            }

            // Para garantizar que no se considere a un agente que ya realizó una trasacción en este currentTime
            arraySelect.splice(idx, 1);
        }
    }

    public createTransferOperation(currentTime: number): void {

        // Individuos y empresas
        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        // Total de transacciones a realizar en diferentes agentes
        const totalExecuteTransfer = Math.ceil(this._args.perExcecuteTransfer * arraySelect.length);

        // realizar las transacciones
        for (let _ = 0; _ < totalExecuteTransfer; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            // NODO ORIGEN
            const oneNode = arraySelect[idx];
            const agentSource = <BaseOperationAgent>oneNode.agent;

            if (!agentSource.isFrozenAccounts) {

                // Definir el monto a transferir
                let amountTransaction = UtilityRandom.randomRangeMM(this._args.rangeAmountTransaction, 2);
                amountTransaction = agentSource.ledger.maxMoney(amountTransaction);

                if (amountTransaction > 0) {

                    // Si el agente tiene alta predisposición al fraude tiene alta probabilidad realizar un movimiento ilícito
                    // Simular que el agente DECIDE si hacer un transacción legal o ilegal
                    const isStructure = UtilityRandom.roulettePerOne(agentSource.predispositionFraud);

                    const isObserved = amountTransaction >= this._args.amountSuspiciousOperation;

                    // NODO DESTINO
                    const twoNode = this.oldOrNewNeighbor(oneNode);
                    const agentTarget = <BaseOperationAgent>twoNode.agent;

                    if (!agentTarget.isFrozenAccounts) {

                        if ((agentSource.predispositionFraud >= this._args.maxPropensityFraud && isObserved && isStructure)) {

                            /** ************************************************* */
                            /**        TRANSACCIÓN COMPLEJA FRAUDULENTA           */
                            /** ************************************************* */

                            // Complex/Fraund/structure
                            const totalNeighbors = oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

                            // Re-estructura de la transacción.
                            const structure = this.structureAmount(amountTransaction);
                            if (structure.length > totalNeighbors) this.createNewNeighbors(oneNode, structure.length - totalNeighbors)

                            const selectNeighbors = oneNode.neighborsByNoAgent(IntermediaryAgent);

                            structure.some(amount => {

                                /** ************************************************* */
                                /**       EJECUTAR ESTRUCTURA DE TRANSFERENCIAS       */
                                /** ************************************************* */

                                if (selectNeighbors.length <= 0) return;

                                // Elegir de manera aleatoria un índice del arreglo de nodos
                                const idx = UtilityRandom.randomRange(0, selectNeighbors.length - 1);

                                // Seleccionar un tercer participante
                                const threeNode = selectNeighbors[idx];

                                // Transferencia fraudalenta/ilegal e indireacta
                                this.doTransfer(oneNode, threeNode, currentTime, amount, true, false);

                                // Transferencia para consolidar los montos en el destino
                                this.doTransfer(threeNode, twoNode, currentTime, amount, true, false);
                            });
                        }
                        else
                            /** ************************************************* */
                            /**             TRANSACCIÓN SIMPLE LEGAL              */
                            /** ************************************************* */
                            // Transferencia legal
                            this.doTransfer(oneNode, twoNode, currentTime, amountTransaction, false, isObserved);
                    }
                }
            }

            // Para garantizar que no se considere a un agente que ya realizó una trasacción en este currentTime
            arraySelect.splice(idx, 1);
        }

    }

    public createWithdrawalOperation(currentTime: number): void {

        // Individuos y empresas
        let arraySelect = this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent));

        // Total de transacciones a realizar en diferentes agentes
        const totalExecuteWithdrawal = Math.ceil(this._args.perExcecuteWithdrawal * arraySelect.length);

        // realizar las transacciones
        for (let _ = 0; _ < totalExecuteWithdrawal; _++) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);

            // NODO ORIGEN
            const oneNode = arraySelect[idx];
            const agentSource = <BaseOperationAgent>oneNode.agent;

            if (!agentSource.isFrozenAccounts) {

                // Definir el monto a transferir
                let amountTransaction = UtilityRandom.randomRangeMM(this._args.rangeAmountTransaction, 2);
                amountTransaction = agentSource.ledger.maxMoney(amountTransaction);

                if (amountTransaction > 0) {

                    // Si el agente tiene alta predisposición al fraude tiene alta probabilidad realizar un movimiento ilícito
                    // Simular que el agente DECIDE si hacer un transacción legal o ilegal
                    const isStructure = UtilityRandom.roulettePerOne(agentSource.predispositionFraud);

                    const isObserved = amountTransaction >= this._args.amountSuspiciousOperation;

                    if ((agentSource.predispositionFraud >= this._args.maxPropensityFraud && isObserved && isStructure)) {

                        /** ************************************************* */
                        /**        TRANSACCIÓN COMPLEJA FRAUDULENTA           */
                        /** ************************************************* */

                        // Complex/Fraund/structure
                        const totalNeighbors = oneNode.totalNeighborsByNoAgent(IntermediaryAgent);

                        // Re-estructura de la transacción.
                        const structure = this.structureAmount(amountTransaction);
                        if (structure.length > totalNeighbors) this.createNewNeighbors(oneNode, structure.length - totalNeighbors)

                        const selectNeighbors = oneNode.neighborsByNoAgent(IntermediaryAgent);

                        structure.some(amount => {

                            /** ************************************************* */
                            /**       EJECUTAR ESTRUCTURA DE TRANSFERENCIAS       */
                            /** ************************************************* */

                            if (selectNeighbors.length <= 0) return;

                            // Elegir de manera aleatoria un índice del arreglo de nodos
                            const idx = UtilityRandom.randomRange(0, selectNeighbors.length - 1);

                            // Seleccionar un tercer participante
                            const threeNode = selectNeighbors[idx];

                            // Transferencia para consolidar los montos en el destino
                            this.doTransfer(oneNode, threeNode, currentTime, amount, true, false);

                            // Transferencia fraudalenta/ilegal e indireacta: DEPOSITO
                            this.doWithdrawal(threeNode, currentTime, amount, true, false);

                        });

                    }
                    else
                        /** ************************************************* */
                        /**             TRANSACCIÓN SIMPLE LEGAL              */
                        /** ************************************************* */
                        // Transferencia legal
                        this.doWithdrawal(oneNode, currentTime, amountTransaction, false, isObserved);


                }
            }

            // Para garantizar que no se considere a un agente que ya realizó una trasacción en este currentTime
            arraySelect.splice(idx, 1);
        }
    }

    //#####################################
    // MËTODOS DE APOYO
    //#####################################

    private createEdge(oneNode: Host, links: number, arraySelect: Host[]): void {

        // Crear conexiones y vecinos
        while (links > 0) {

            if (arraySelect.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx = UtilityRandom.randomRange(0, arraySelect.length - 1);
            const twoNode = arraySelect[idx];

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
            arraySelect.splice(idx, 1);

        }
    }

    private createEdgeFinantial(oneNode: Host, links: number, arraySelect02: Host[]): void {

        // Crear conexiones y vecinos
        while (links > 0) {
            //for (let _ = 0; _ < links; _++) {

            if (arraySelect02.length <= 0) break;

            // Elegir de manera aleatoria un índice del arreglo de nodos
            const idx02 = UtilityRandom.randomRange(0, arraySelect02.length - 1);
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
                    const isIllegal = UtilityRandom.roulettePerOne(agent.predispositionFraud)

                    // Parte de un balance inicial
                    agent.ledger.moneyIn({

                        sourceEntity: isIllegal ? TypeFinantialEntity.INGRESO_INFORMAL : TypeFinantialEntity.INGRESO_FORMAL,
                        targetEntity: entity.finantialEntity,
                        sourceLocation: TypePlace.DESCONOCIDO,
                        targetLocation: oneNode.location,
                        currentTime: 0,  // 0 será el currentTime debido que aún no hay ningun Tick
                        amount: UtilityRandom.randomRangeMM(this._args.rangeAmountTransaction, 2),
                        isIllegaly: isIllegal

                    });

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
        const threeNode = twoEntities[UtilityRandom.randomRange(0, twoEntities.length - 1)];

        this.createEdge(oneNode, 1, [threeNode]);

        return [(<IntermediaryAgent>threeNode.agent), (<IntermediaryAgent>threeNode.agent)]

    }

    private oldOrNewNeighbor(oneNode: Host): Host {
        const isNewNeighbor = UtilityRandom.roulettePerOne(this._args.perNewLinkTransact);
        let twoNode!: Host;
        if (isNewNeighbor) {
            this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent))
                .some(el => {
                    if (!oneNode.equal(twoNode)) {
                        const edge = new Edge(oneNode, twoNode)

                        if (!oneNode.neighbors.contains(el)) {
                            twoNode = el;

                            // Crear vecinos nuevos
                            oneNode.neighbors.push(twoNode);
                            twoNode.neighbors.push(oneNode);

                            // Agregar enlace/edge
                            this._edges.push(new Edge(oneNode, twoNode));

                            return;
                        }
                    }
                });

        }
        if (twoNode === undefined) {
            const neighbors = oneNode.neighborsByNoAgent(IntermediaryAgent);
            twoNode = neighbors[UtilityRandom.randomRange(0, neighbors.length - 1)];
        }

        return twoNode;
    }

    private structureAmount(amount: number): Array<number> {
        const capAmount = this._args.amountSuspiciousOperation;
        const structure: Array<number> = new Array();
        if (amount >= capAmount) {

            const dim = Math.ceil(amount / (0.8 * capAmount));
            const amountStructure = UtilityRandom.roundDec((amount / dim), 2);
            structure.push(amountStructure);
        }
        return structure;
    }

    private createNewNeighbors(oneNode: Host, links: number) {

        this.createEdge(oneNode, links, this._nodes.filter(e => !e.agent.isAgent(IntermediaryAgent)));
    }

    private doTransfer(oneNode: Host, twoNode: Host, currentTime: number, amountTransaction: number, isIllegal: boolean, isObserved: boolean): void {

        const entities = this.sourceDestinyEntity(oneNode, twoNode);

        const agentSource = <BaseOperationAgent>oneNode.agent;
        const agentTarget = <BaseOperationAgent>twoNode.agent;

        // Money out
        agentSource.ledger.moneyOut({

            sourceEntity: entities[0].finantialEntity,
            targetEntity: entities[1].finantialEntity,
            sourceLocation: oneNode.location,
            targetLocation: twoNode.location,
            currentTime: currentTime,
            amount: amountTransaction,
            isIllegaly: isIllegal

        });

        // Money in
        agentTarget.ledger.moneyIn({

            sourceEntity: entities[0].finantialEntity,
            targetEntity: entities[1].finantialEntity,
            sourceLocation: oneNode.location,
            targetLocation: twoNode.location,
            currentTime: currentTime,
            amount: amountTransaction,
            isIllegaly: isIllegal
        });

        const transact = new Transact();
        transact.sourceNode = oneNode;
        transact.destinyNode = twoNode;
        transact.sourceEntity = entities[0].finantialEntity;
        transact.destinyEntity = entities[1].finantialEntity;
        transact.isSourceInWatchList = this._whachList.isAgentInWatch(agentSource, currentTime);
        transact.isDestinyInWatchList = this._whachList.isAgentInWatch(agentTarget, currentTime);
        transact.typeMove = TypeOperation.TRANSFER;
        transact.isIlegally = isIllegal;
        transact.amount = amountTransaction;
        transact.currentTime = currentTime;
        this._transactions.push(transact);

        // Agregar a watchlist
        if (isObserved)
            if (this._whachList.pushWatchFrozen(agentSource, currentTime))
                agentSource.isFrozenAccounts = true;
    }

    private doDeposit(oneNode: Host, currentTime: number, amountTransaction: number, isIllegal: boolean, isObserved: boolean): void {

        const oneEntities = oneNode.neighborsByAgent(IntermediaryAgent);
        const entity = <IntermediaryAgent>oneEntities[UtilityRandom.randomRange(0, oneEntities.length - 1)].agent;
        const agentSource = <BaseOperationAgent>oneNode.agent;

        // Parte de un balance inicial
        agentSource.ledger.moneyIn({

            sourceEntity: isIllegal ? TypeFinantialEntity.INGRESO_INFORMAL : TypeFinantialEntity.INGRESO_FORMAL,
            targetEntity: entity.finantialEntity,
            sourceLocation: TypePlace.DESCONOCIDO,
            targetLocation: oneNode.location,
            currentTime: currentTime,
            amount: amountTransaction,
            isIllegaly: isIllegal

        });

        this._whachList.isAgentInWatch(agentSource, currentTime);
        const transact = new Transact();
        transact.sourceNode = undefined;
        transact.destinyNode = oneNode;
        transact.sourceEntity = isIllegal ? TypeFinantialEntity.INGRESO_INFORMAL : TypeFinantialEntity.INGRESO_FORMAL;
        transact.destinyEntity = entity.finantialEntity;
        transact.isSourceInWatchList = false;
        transact.isDestinyInWatchList = this._whachList.isAgentInWatch(agentSource, currentTime);
        transact.typeMove = TypeOperation.DEPOSIT;
        transact.isIlegally = isIllegal;
        transact.amount = amountTransaction;
        transact.currentTime = currentTime;
        this._transactions.push(transact);

        // Agregar a watchlist
        if (isObserved)
            if (this._whachList.pushWatchFrozen(agentSource, currentTime))
                agentSource.isFrozenAccounts = true;
    }

    private doWithdrawal(oneNode: Host, currentTime: number, amountTransaction: number, isIllegal: boolean, isObserved: boolean): void {

        const oneEntities = oneNode.neighborsByAgent(IntermediaryAgent);
        const entity = <IntermediaryAgent>oneEntities[UtilityRandom.randomRange(0, oneEntities.length - 1)].agent;
        const agentSource = <BaseOperationAgent>oneNode.agent;

        // Parte de un balance inicial
        agentSource.ledger.moneyOut({

            sourceEntity: entity.finantialEntity,
            targetEntity: isIllegal ? TypeFinantialEntity.EGRESO_INFORMAL : TypeFinantialEntity.EGRESO_FORMAL,
            sourceLocation: oneNode.location,
            targetLocation: TypePlace.DESCONOCIDO,
            currentTime: currentTime,
            amount: amountTransaction,
            isIllegaly: isIllegal

        });

        this._whachList.isAgentInWatch(agentSource, currentTime);
        const transact = new Transact();
        transact.sourceNode = oneNode;
        transact.destinyNode = undefined;
        transact.sourceEntity = entity.finantialEntity;
        transact.destinyEntity = isIllegal ? TypeFinantialEntity.EGRESO_INFORMAL : TypeFinantialEntity.EGRESO_FORMAL;
        transact.isSourceInWatchList = this._whachList.isAgentInWatch(agentSource, currentTime);
        transact.isDestinyInWatchList = false;
        transact.typeMove = TypeOperation.WITHDRAWAL;
        transact.isIlegally = isIllegal;
        transact.amount = amountTransaction;
        transact.currentTime = currentTime;
        this._transactions.push(transact);

        // Agregar a watchlist
        if (isObserved)
            if (this._whachList.pushWatchFrozen(agentSource, currentTime))
                agentSource.isFrozenAccounts = true;
    }

}