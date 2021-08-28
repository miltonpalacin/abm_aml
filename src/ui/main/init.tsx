import React, { Fragment, useEffect, useState } from 'react';
import "./app.scss";
import "bootswatch/dist/minty/bootstrap.min.css";
import { Log, LogItemCache } from '@/app/abm/helper/Log';
import { LogList, scrollLogToBottom } from '../component/logList';
// import LogList from '../component/logList';


// const logs: Array<LogItemCache> = Log.logCache;

let c = 0;
// Log.info("prueba.." + c);

const App = () => {

    const [log, setLog] = useState<Array<LogItemCache>>(Log.logCache)

    const updateLog = () => {
        c++;
        Log.info("prueba.." + c);
        setLog([...Log.logCache]);
        scrollLogToBottom();
    };

    useEffect(() => {
        const logger = setInterval(() => updateLog(), 1000);
        return () => clearInterval(logger);
    });


    return (
        <Fragment>
            <div className="container-fluid h-100 background-black">
                <div className="row m-2 p-1 background-red">
                    <div className="col-md-12 m-2 p-1">
                        <span>Simulador Agent-Based Modelling y Anti-Money Launndering</span>
                    </div>
                </div>
                <div className="row m-2 p-1 background-blue">
                    <div className="col-md-2">
                        <span>asdas</span>
                        <button type="button" className="btn btn-success">
                            Button
                        </button>
                    </div>
                    <div className="col-md-7 background-yellow">
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                    </div>
                    <div className="col-md-3 background-green">
                        <LogList logs={log}></LogList>
                    </div>
                </div>
                <div className="row mt-auto m-2 p-1 align-items-end background-pink">
                    <div className="col-md-12 m-2 p-1">
                        axsa
                    </div>
                </div>
            </div>
        </Fragment>
    );
    // <Fragment>
    //     <div>
    //         <LogList logs={log}></LogList>
    //     </div>
    // </Fragment>

}

// return (
//     <Fragment>
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Evento</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {log.length > 0 ? (
//                         log.map(i => (
//                             <tr key={i.order}>
//                                 <td>{i.message}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={1}>.........</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     </Fragment>
// );

// const App = () => {
//     return (
//         <Fragment>
//             <div className="container-fluid background-black">
//                 <div className="row m-2 p-1 background-red">
//                     <div className="col-md-12 m-2 p-1">
//                         <span>Simulador Agent-Based Modelling y Anti-Money Launndering</span>
//                     </div>
//                 </div>
//                 <div className="row m-2 p-1 background-blue">
//                     <div className="col-md-2">
//                         <span>asdas</span>
//                         <button type="button" className="btn btn-success">
//                             Button
//                         </button>
//                     </div>
//                     <div className="col-md-7 background-yellow">
//                         <h3>
//                             h3. Lorem ipsum dolor sit amet.
//                         </h3>
//                     </div>
//                     <div className="col-md-3 background-green">
//                         <span >asdasd</span>
//                     </div>
//                 </div>
//                 <div className="row mt-auto m-2 p-1 align-items-end background-pink">
//                     <div className="col-md-12 m-2 p-1">
//                         axsa
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// const App = () => {
//     return (
//         <Fragment>
//             <div className="ecample">
//                 QWE
//             </div>
//             <main className="container-fluid" id="productForm">
//                 <div className="row">
//                     <div className="col-md-6 p-4 my-auto">
//                         <form className="card card-body gap-3">
//                             <div className="form-group">
//                                 <input type="text" id="name" placeholder="Product's name" className="form-control" autoFocus />
//                             </div>
//                             <div className="form-group">
//                                 <input type="number" id="price" placeholder="Product's price" step="any" className="form-control" />
//                             </div>
//                             <div className="form-group">
//                                 <textarea id="description" placeholder="Product's description" className="form-control"></textarea>
//                             </div>
//                             <button className="btn btn-primary">Save</button>
//                         </form>
//                     </div>

//                     <div className="col-md-6">
//                         <div id="products"></div>
//                     </div>
//                 </div>
//             </main>
//         </Fragment>
//     );
// }


export default App;


// const [count, setCount] = useState(0);
    // const [countInTimeout, setCountInTimeout] = useState(0);


    // setTimeout(() => {
    //     c++;
    //     console.log(c);
    //     setCount(c);
    //     setCountInTimeout(count); // count is 0 here
    // }, 5000);
    //setCount(5); // Update count to be 5 after timeout is scheduled

    // const setIntervalConst: ReturnType<typeof setInterval> = setInterval(() => {
    //     c++;
    //     //console.log(c);
    //     setCount(c);
    //     //setCountInTimeout(count); // count is 0 here
    // }, 1000)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       console.log('This will run after 1 second!')
    //     }, 1000);
    //     return () => clearTimeout(timer);
    //   }, []);
