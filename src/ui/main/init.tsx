import React, { Fragment, useEffect, useState } from 'react';
import "./app.scss";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import { Log, LogItemCache } from '@/app/abm/helper/Log';
import { LogList, scrollLogToBottom } from '../component/logList';
import { Simulation } from '@/app/abm/simulation/Simulation';
import { sleep } from '@/app/abm/simulation/Setup';

// Para que dentro de app no se cree a cada momento
let sizeLogBefore: number = 0;

const App = () => {

    // let runSimulation = false;

    const [log, setLog] = useState<Array<LogItemCache>>(Log.logCache);
    const [runSimulation, setRunSimulation] = useState<boolean>(false);

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
        await Simulation.run();
        setRunSimulation(false);
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

                    <div className="col-md-9 background-no-uni simulation-draw">
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                    </div>
                    <div className="col-md-3 p-2">
                        <button type="button" disabled={runSimulation} className="btn btn-success" onClick={() => onSimulation()}>
                            Ejecutar
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