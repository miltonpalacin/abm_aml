import React, { Fragment, useEffect, useState } from 'react';
import "./app.scss";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import { Log, LogItemCache } from '@/app/abm/helper/Log';
import { LogList, scrollLogToBottom } from '../component/logList';
import { Simulation } from '@/app/abm/simulation/Simulation';
import { Setup, sleep } from '@/app/abm/simulation/Setup';
import DrawTopology from '../component/topology';
import { StaticTopology } from '../component/networkgraph';
import { INodeInfo, ITypeArgNetwork } from '@/app/abm/helper/Types';

// Para que dentro de app no se cree a cada momento
let sizeLogBefore: number = 0;

const App = () => {

    const [log, setLog] = useState<Array<LogItemCache>>(Log.logCache);
    const [runSimulation, setRunSimulation] = useState<boolean>(false);
    const [seeNetwork, setSeeNetwork] = useState<boolean>(true);
    const [messageSee, setMessageSee] = useState<string>("En espera de un red");
    const [stop, setStop] = useState<boolean>(true);
    const [messageStop, setMessageStop] = useState<string>("En espera de ejecución");
    const [currentArg, setCurrentArg] = useState<ITypeArgNetwork>();
    const [currentNode, setCurrentNode] = useState<INodeInfo>();


    const [network, setNetwork] = useState<number>(-1);

    const updateLog = () => {
        if (sizeLogBefore - Log.logCache.length !== 0) {
            scrollLogToBottom();
            sizeLogBefore = Log.logCache.length
            setLog([...Log.logCache]);
        }
    };

    useEffect(() => {
        const logger = setInterval(() => updateLog(), 100);
        return () => clearInterval(logger);
    });

    const onSimulation = async () => {
        Log.debug(`INICIO DE ABM en AML`);
        await sleep(10);
        setRunSimulation(true);
        setSeeNetwork(false);
        setMessageSee("Para red para verlo")
        setStop(false);
        setMessageStop("Cancelar")
        await Simulation.run(setNetwork, setCurrentArg);
        setRunSimulation(false);
        setSeeNetwork(true);
        setMessageSee("En espera de un red")
        setStop(true);
        setMessageStop("En espera de ejecución")
    }

    const onSeeNetwork = async () => {
        if (messageSee === "Para red para verlo") {
            StaticTopology.stopUpdateTopologia = true;
            setMessageSee("Activar actualización de red");

        }
        else {
            StaticTopology.stopUpdateTopologia = false;
            setMessageSee("Para red para verlo");
        }
    }


    const onStop = async () => {
        if (messageStop === "Cancelar") {
            Setup.cancelarSimulation = true;
            setStop(true);
        }
    }

    const setInfoNode = async (node: INodeInfo) => {
        console.log("Entro a agente" + node.code);

        // const agent = network?.nodes.find(a => a.agent.codeShort == codNode)?.agent;
        setCurrentNode(node);

    }



    return (
        <Fragment>
            <div className="container-fluid h-100">
                <div className="row background-soft-uni p-1 simulation-title">
                    <div className="col-md-12">
                        <h3><em>Simulador ABM - AML</em></h3>
                    </div>
                </div>
                <div className="row background-cream-uni simulation-body">

                    <div className="col-md-9 background-no-uni p-1 simulation-draw">
                        <DrawTopology network={network} setInfoNode={(node: INodeInfo) => setInfoNode(node)}> </DrawTopology>
                    </div>
                    <div className="col-md-3 p-2" style={{ height: "100%", overflow: "auto" }}>
                        <button type="button" disabled={runSimulation} className="btn btn-success col-md-12" onClick={() => onSimulation()}>
                            Ejecutar Simulación
                        </button>
                        <button type="button" disabled={stop} className="btn btn-primary col-md-12 mt-2" onClick={() => onStop()}>
                            {messageStop}
                        </button>
                        <button type="button" disabled={seeNetwork} className="btn btn-info col-md-12 mt-2" onClick={() => onSeeNetwork()}>
                            {messageSee}
                        </button>

                        <div className="card bg-light mb-3 mt-3" >
                            <div className="card-header fw-bold">Configuración Actual</div>
                            <div className="card-body" style={{ maxHeight: "260px", overflow: "auto" }} >


                                {currentArg != undefined ? (
                                    <pre>
                                        <p><em className="fw-bold">Simulación:</em> </p>
                                        <p><span className="fst-italic">totalIterations:</span><span> {currentArg.totalIterations}</span></p>
                                        <p><span className="fst-italic">currentIteration:</span><span> {currentArg.currentIteration}</span></p>
                                        <p><span className="fst-italic">totalTimes:</span><span> {currentArg.totalTimes}</span></p>
                                        <p><span className="fst-italic">idDatabase:</span><span> {currentArg.idDatabase}</span></p>
                                        <p><em className="fw-bold">Población:</em> </p>
                                        <p><span className="fst-italic">numPopIndividual:</span><span> {currentArg.numPopIndividual}</span></p>
                                        <p><span className="fst-italic">numPopIntermediary:</span><span> {currentArg.numPopIntermediary}</span></p>
                                        <p><span className="fst-italic">numPopNoProfitBusiness:</span><span> {currentArg.numPopNoProfitBusiness}</span></p>
                                        <p><span className="fst-italic">numPopProfitBusiness:</span><span> {currentArg.numPopProfitBusiness}</span></p>
                                        <p><span className="fst-italic">numPopTrustBusiness:</span><span> {currentArg.numPopTrustBusiness}</span></p>
                                        <p><span className="fst-italic">numPopShellBusiness:</span><span> {currentArg.numPopShellBusiness}</span></p>
                                        <p><span className="fst-italic">numPopHighPropensityFraud:</span><span> {currentArg.numPopHighPropensityFraud}</span></p>
                                        <p><em className="fw-bold">Watchlist:</em> </p>
                                        <p><span> className="fst-italic"perPopWatchList:</span><span> {currentArg.perPopWatchList}</span></p>
                                        <p><span className="fst-italic">maxTimesWatchList:</span><span> {currentArg.maxTimesWatchList}</span></p>
                                        <p><span className="fst-italic">maxTimesCleanWatchList:</span><span> {currentArg.maxTimesCleanWatchList}</span></p>
                                        <p><em className="fw-bold">Fraude:</em> </p>
                                        <p><span className="fst-italic">maxPropensityFraud:</span><span> {currentArg.maxPropensityFraud}</span></p>
                                        <p><span className="fst-italic">maxHighPropensityFraud:</span><span> {currentArg.maxHighPropensityFraud}</span></p>
                                        <p><em className="fw-bold">Enlace/Conexione:</em> </p>
                                        <p><span className="fst-italic">perLinkedIntermediary:</span><span> {currentArg.perLinkedIntermediary}</span></p>
                                        <p><span className="fst-italic">numMaxLinkedNoIntermediary:</span><span> {currentArg.numMaxLinkedNoIntermediary}</span></p>
                                        <p><span className="fst-italic">numMaxLinkedIndBusInter:</span><span> {currentArg.numMaxLinkedIndBusInter}</span></p>
                                        <p><span className="fst-italic">perNewLinkTransact:</span><span> {currentArg.perNewLinkTransact}</span></p>
                                        <p><em className="fw-bold">Transaccion:</em> </p>
                                        <p><span className="fst-italic">perExecuteDeposit:</span><span> {currentArg.perExecuteDeposit}</span></p>
                                        <p><span className="fst-italic">perExecuteTransfer:</span><span> {currentArg.perExecuteTransfer}</span></p>
                                        <p><span className="fst-italic">perExecuteWithdrawal:</span><span> {currentArg.perExecuteWithdrawal}</span></p>
                                        <p><em className="fw-bold">Monto:</em> </p>
                                        <p><span className="fst-italic">amountSuspiciousOperation:</span><span> {currentArg.amountSuspiciousOperation}</span></p>
                                        <p><span className="fst-italic">rangeAmountTransaction:</span><span> max:{currentArg.rangeAmountTransaction.end} </span></p>

                                    </pre>
                                ) : (<p className="card-text">Ejecute la simulación...</p>)
                                }


                            </div>
                        </div>
                        <div className="card bg-light mb-3">
                            <div className="card-header fw-bold">Datos de un agente</div>
                            <div className="card-body" style={{ maxHeight: "220px", overflow: "auto" }} >
                                {currentNode != undefined ? (
                                    <pre>
                                        <p><span className="fst-italic">Código:</span>{currentNode?.codeShort}</p>
                                        <p><span className="fst-italic">Tipo:</span>{currentNode?.code}</p>
                                        <p><span className="fst-italic">Lugar del Agente:</span>{currentNode?.placeAgent}</p>
                                        <p><span className="fst-italic">Lugar de Movimiento:</span>{currentNode?.placeNode}</p>
                                        <p><span className="fst-italic">Ingresos:</span>{currentNode?.amountIn}</p>
                                        <p><span className="fst-italic">Egresos:</span>{currentNode?.amountOut}</p>
                                        <p><span className="fst-italic">Ingreso Ilegal:</span>{currentNode?.totalIllegalIn}</p>
                                        <p><span className="fst-italic">Egreso Ilegal:</span>{currentNode?.totalIllegalOut}</p>
                                        <p><span className="fst-italic">Esta congelado:</span>{currentNode?.isFrozen ? "Sí" : "No"}</p>
                                        <p><span className="fst-italic">Entidad (Intermediarios):</span>{currentNode?.entityFinantial}</p>
                                    </pre>
                                ) : (<p className="card-text">Presione un agente de la red...</p>)
                                }

                            </div>
                        </div>

                    </div>
                </div>
                <div className="row mt-auto background-gray-uni">
                    <div className="col-md-12">
                        <LogList logs={log}></LogList>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default App;