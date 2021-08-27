import { ITypeArgNetwork, ITypePreSettings } from "../helper/Types";
import { Settings } from "./Settings";
import * as fs from 'fs';
import path from "path";
import * as csv from 'fast-csv';

export class Setup {

    private static _fileName: string = path.resolve("./src/app/abm/simulation", "abm-aml.csv");
    public static values: Array<ITypePreSettings>[];


    private static _initialize = (() => {
        Setup.init();
    })();


    private static async init() {

        const values: Array<ITypePreSettings>[] = [];

        await new Promise(resolve => {
            fs.createReadStream(this._fileName)
                .pipe(csv.parse({ headers: true }))
                .on('error', error => console.error(error))
                .on('data', row => { values.push(row); })
                .on('end', (rowCount: number) => { resolve(`Parsed ${rowCount} rows`) });
        });

        console.log(values[1]);


    }

    public static async global() {

        return {
            totalIteration: Settings.values.totalSimulation
        }
    }

    public static local(index: number): ITypeArgNetwork {
        const argsCreateAgent: ITypeArgNetwork = {
            numPopIndivual: 0,

            //popBusiness: number;
            numPopIntermediary: 0,

            numPopNoProfitBusiness: 0,
            numPopProfitBusiness: 0,
            numPopTrustBusiness: 0,
            numPopShellBusiness: 0,

            numPopHighPropensityFraud: 0, // En base a solo individuos y negocios

            /**  Porcentaje, debido que solo recién en la creación se tiene el dato del 
             numero de agentes con alta propensión a cometer fraude */
            perPopWatchList: 0,
            maxTimesWatchList: 0,
            maxTimesCleanWatchList: 0,

            maxPropensityFraud: 0,
            maxHighPropensityFraud: 0, // Math.min(maxPropensityFraud + 0.2, 0.9) 

            perLinkedIntermediary: 0, //Solo intermediarios
            numMaxLinkedNoIntermediary: 0, // Entre empresa e individuos
            numMaxLinkedIndBusInter: 0, // Enter empresa / individuos y intermediarios

            perExcecuteDeposit: 0,
            perExcecuteTransfer: 0,
            perExcecuteWithdrawal: 0,

            amountSuspiciousOperation: 0,

            rangeAmountTransaction: { start: 0, end: 0 },

            perNewLinkTransact: 0
        };
        return argsCreateAgent;
    }
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}