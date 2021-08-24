import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { BaseAgent } from '../abm/agent/BaseAgent';
import { BaseOperationAgent } from '../abm/agent/BaseOperationAgent';
import { IndividualAgent } from '../abm/agent/IndividualAgent';
import { IntermediaryAgent } from '../abm/agent/IntermediaryAgent';
import { NoProfitBusinessAgent } from '../abm/agent/NoProfitBusinessAgent';
import { TypePlace } from '../abm/data/TypePlace';
import { Host } from '../abm/environment/Host';
import { ArrayList } from '../abm/helper/ArrayList';
import { UtilityRandom } from '../abm/odd/UtilityRandom';

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

// const agent = new IndividualAgent();
// if (agent.getPredispositionFraud() === undefined)
//     console.log("OOOOO: " + agent.getPredispositionFraud());

const nodes: ArrayList<Host> = ArrayList.create();

nodes.push(new Host(new IndividualAgent()));
nodes.push(new Host(new IndividualAgent()));
nodes.push(new Host(new NoProfitBusinessAgent()));
nodes.push(new Host(new NoProfitBusinessAgent()));
nodes.push(new Host(new IntermediaryAgent()));
nodes.push(new Host(new IntermediaryAgent()));

nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) &&
    (<BaseOperationAgent>e.agent).predispositionFraud === undefined)
    .forEach(e => {
        console.log("Agente: " + e.agent.code);
    });


const x = 23
const y = 4
console.log("1)" + (x/y) )
console.log("2)" + Math.round(x/y) )

app.on('ready', createWindow);
 