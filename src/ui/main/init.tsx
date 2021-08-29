import React, { Fragment, useEffect, useState } from 'react';
import "./app.scss";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import { Log, LogItemCache } from '@/app/abm/helper/Log';
import { LogList, scrollLogToBottom } from '../component/logList';
import { Simulation } from '@/app/abm/simulation/Simulation';
import { Setup, sleep } from '@/app/abm/simulation/Setup';
import { Network } from '@/app/abm/environment/Network';
import DrawTopology from '../component/topology';
import { StaticTopology } from '../component/networkgraph';

// Para que dentro de app no se cree a cada momento
let sizeLogBefore: number = 0;

const App = () => {

    // let runSimulation = false;

    const [log, setLog] = useState<Array<LogItemCache>>(Log.logCache);
    const [runSimulation, setRunSimulation] = useState<boolean>(false);
    const [seeNetwork, setSeeNetwork] = useState<boolean>(true);
    const [messageSee, setMessageSee] = useState<string>("En espera de un red");
    const [stop, setStop] = useState<boolean>(true);
    const [messageStop, setMessageStop] = useState<string>("En espera de ejecución");


    const [network, setNetwork] = useState<Network>();

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
        await Simulation.run(setNetwork);
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
                        <DrawTopology network={network}></DrawTopology>
                    </div>
                    <div className="col-md-3 p-2">
                        <button type="button" disabled={runSimulation} className="btn btn-success col-md-12" onClick={() => onSimulation()}>
                            Ejecutar
                        </button>
                        <button type="button" disabled={stop} className="btn btn-primary col-md-12 mt-2" onClick={() => onStop()}>
                            {messageStop}
                        </button>
                        <button type="button" disabled={seeNetwork} className="btn btn-info col-md-12 mt-2" onClick={() => onSeeNetwork()}>
                            {messageSee}
                        </button>

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