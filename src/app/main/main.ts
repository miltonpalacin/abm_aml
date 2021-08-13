import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { Log } from '../abm/helper/Log';

//console.log(__dirname);

const createWindow = (): void => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    win.loadURL(
        isDev
            ? 'http://localhost:9000'
            : `file://${app.getAppPath()}/index.html`,
    );
}

//console.log("ANTES.... " +Log.getFileName());
// Log.silly("milton");
// Log.info("tree");
// const obj = { a: "1", b: "2", c: true, d: -1, date: new Date() };
// obj.date = new Date();
// Log.info("treeddd", obj);
// //console.log(Log.getFileName());

// try {
//     const I = 0;
//     const II = 100 / I;
//     const x = new Error("nnnnnn");
//     throw x;
// } catch (error) {
//     Log.fatal(error);
// }

// let logs = Log.getNewLogsCache();

// logs.forEach(e => {
//     console.log("OONE_" + e.order + "._." + e.message);
// });

// logs = Log.getNewLogsCache();

// logs.forEach(e => {
//     console.log("TTWO_" + e.order + "._." + e.message);
// });

app.on('ready', createWindow);
