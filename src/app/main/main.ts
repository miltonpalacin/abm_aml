import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { BaseAgent } from '../abm/agent/BaseAgent';
import { IndividualAgent } from '../abm/agent/IndividualAgent';
import { TypePlace } from '../abm/data/TypePlace';
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
const agent = new IndividualAgent();
if (agent.getPredispositionFraud() === undefined)
    console.log("OOOOO: " + agent.getPredispositionFraud());
// console.log("DDDDDDDDD: " + UtilityRandom.getRandomRange(0, 0, 2));


// let nodes: ArrayList<Node> = ArrayList.create();

// console.log(nodes.length);

// Node.createAgents(10, nodes, NoProfitBusinessAgent)

// console.log(nodes.length);
// console.log(nodes[3].getAgent().getCode());
// console.log(nodes[9].getAgent().getLocation());

// const array: ArrayList<BaseAgent> = ArrayList.create();
// let agent = new IndividualAgent();
// agent.build();
// agent.setLocation(TypePlace.data.getByKeyTrust("U08"))
// console.log("1):" + agent.getCode() + "." + agent.getLocation());
// array.push(new IndividualAgent());
// array.push(new IndividualAgent());
// array.push(agent);
// array.push(agent);
// array.push(agent);
// let x = array[2];
// console.log("2):" + x.getCode() + "." + x.getLocation());
// const val = UtilityRandom.getRandomOfKeyValue(TypePlace.data);
// agent.setLocation(val);
// console.log("3):" + x.getCode() + "." + x.getLocation());

// let xs = array.filter(e => e.getLocation() === undefined);
// let v = xs[0];
// console.log("4):" + xs.length + "-" + xs[0].getCode());
// v.setLocation(TypePlace.data.getByKeyTrust("U09"))
// xs.pop();
// xs.pop();
// console.log("5):" + xs.length);
// x = array[0];
// console.log("6):" + x.getCode() + "." + x.getLocation());

// let aa = array.find(e => e.getLocation() === undefined);
// console.log("2):" + aa?.getCode());

// const aa = new IndividualAgent();
// const bb:BaseAgent = aa;

// console.log(bb.isAgent(NoProfitBusinessAgent))
// console.log(bb.isAgent(IndividualAgent))
// console.log(bb.isAgent(NoProfitBusinessAgent))

// let x = array[0];
// x.setLocation(UtilityRandom.getRandomOfKeyValue(TypePlace.data));
// console.log("1):" + x.getLocation());
// console.log("2):" + array[0].getLocation().toString());

// let z = array.find(e => e.getLocation() && e.getLocation().getKey() == "U08");
// console.log("3):" + z?.getCode());
// z!.setLocation(UtilityRandom.getRandomOfKeyValue(TypePlace.data));
// console.log("4):" + z!.getLocation());
// console.log("5):" + array[1].getLocation().toString());

//console.log("WWWWW=>" + TypePlace.data.getByKey("U05"));
// console.log(Settings.settigsValues.rangeHighPropensityFraud);

// Settings.settigsValues.rangeHighPropensityFraud = { start: 0.015, end: 0.99 };
// Settings.save();
// console.log(Settings.settigsValues.population.initialBusiness);

// console.log(UtilityRandom.test())
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
