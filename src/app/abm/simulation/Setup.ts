import { ITypeArgNetwork, ITypePreSettings } from "../helper/Types";
import { Settings } from "./Settings";
import * as fs from 'fs';
import path from "path";
import * as csv from 'fast-csv';
import { TypeFinantialEntity } from "../data/TypeFinantialEntity";
import { UtilityRandom } from "../odd/UtilityRandom";

export class Setup {

    private static _fileName: string = path.resolve("./src/app/abm/simulation", "abm-aml.csv");
    private static _values: Array<ITypePreSettings>;
    public static cancelarSimulation: boolean = false;

    private static _initialize = (() => {
        Setup.init();
    })();

    private static async init() {

        this._values = new Array();

        await new Promise(resolve => {
            fs.createReadStream(this._fileName)
                .pipe(csv.parse({ headers: true }))
                .on('error', error => console.error(error))
                .on('data', row => {
                    const newRow: ITypePreSettings = {
                        rangeMaxTimesWatchList: Number(row.rangeMaxTimesWatchList),
                        rangeMaxTimesCleanWatchList: Number(row.rangeMaxTimesCleanWatchList),
                        rangeMaxAmountTransaction: Number(row.rangeMaxAmountTransaction),
                        rangePropensityFraud: Number(row.rangePropensityFraud),
                        rangeLinkedIntermediary: Number(row.rangeLinkedIntermediary),
                        rangeMaxLinkedNoIntermediary: Number(row.rangeMaxLinkedNoIntermediary),
                        rangeMaxLinkedIndBusInter: Number(row.rangeMaxLinkedIndBusInter),
                        rangeExecuteDeposit: Number(row.rangeExecuteDeposit),
                        rangeExecuteTransfer: Number(row.rangeExecuteTransfer),
                        rangeExecuteWithdrawal: Number(row.rangeExecuteWithdrawal),
                        rangeNoNeighbor: Number(row.rangeNoNeighbor),
                        rangeNewLinkTransact: Number(row.rangeNewLinkTransact),
                        rangePopulation: Number(row.rangePopulation),
                        rangeIndividual: Number(row.rangeIndividual),
                        rangeBusiness: Number(row.rangeBusiness),
                        rangeIntermediary: Number(row.rangeIntermediary),
                        rangeNoProfitBusiness: Number(row.rangeNoProfitBusiness),
                        rangeProfitBusiness: Number(row.rangeProfitBusiness),
                        rangeTrustBusiness: Number(row.rangeTrustBusiness),
                        rangeShellBusiness: Number(row.rangeShellBusiness),
                        rangeHighPropensityFraud: Number(row.rangeHighPropensityFraud),
                        rangeWatchList: Number(row.rangeWatchList)
                    }
                    this._values.push(newRow);


                })
                .on('end', (rowCount: number) => { resolve(`Parsed ${rowCount} rows`) });
        });

    }

    public static global() {

        return {
            totalIteration: Settings.values.totalIterations
        }
    }

    public static local(index: number): ITypeArgNetwork {

        const sample = this._values[index];

        // Log.debug("DATOS DEL SAMPLE", sample);
        const factorPop01 = sample.rangeBusiness + sample.rangeIndividual;

        const popIntermediary = Math.min(Math.ceil(sample.rangeIntermediary), TypeFinantialEntity.data.length);
        const totalPopulation = Math.ceil(sample.rangePopulation) - popIntermediary;

        const popIndividual = Math.ceil((sample.rangeIndividual / factorPop01) * totalPopulation);
        const popBusiness = Math.ceil((sample.rangeBusiness / factorPop01) * totalPopulation);
        //const popIntermediary = Math.ceil((sample.rangeIntermediary / factorPop01) * sample.rangePopulation);

        const factorPop02 = sample.rangeNoProfitBusiness + sample.rangeProfitBusiness + sample.rangeTrustBusiness + sample.rangeShellBusiness;

        const argsCreateAgent: ITypeArgNetwork = {
            totalTimes: Settings.values.totalTimes,

            numPopIndividual: popIndividual,
            numPopIntermediary: popIntermediary,

            numPopNoProfitBusiness: Math.ceil((sample.rangeNoProfitBusiness / factorPop02) * popBusiness),
            numPopProfitBusiness: Math.ceil((sample.rangeProfitBusiness / factorPop02) * popBusiness),
            numPopTrustBusiness: Math.ceil((sample.rangeTrustBusiness / factorPop02) * popBusiness),
            numPopShellBusiness: Math.ceil((sample.rangeShellBusiness / factorPop02) * popBusiness),

            numPopHighPropensityFraud: Math.floor(sample.rangeHighPropensityFraud * (popIndividual + popBusiness)), // En base a solo individuos y negocios

            /**  Porcentaje, debido que solo recién en la creación se tiene el dato del 
             numero de agentes con alta propensión a cometer fraude */
            perPopWatchList: sample.rangeWatchList,
            maxTimesWatchList: Math.round(sample.rangeMaxTimesWatchList),
            maxTimesCleanWatchList: Math.round(sample.rangeMaxTimesCleanWatchList),

            maxPropensityFraud: sample.rangePropensityFraud,
            maxHighPropensityFraud: UtilityRandom.roundDec(Math.min(sample.rangePropensityFraud + 0.2, 0.9), 5),

            perLinkedIntermediary: sample.rangeLinkedIntermediary, //Solo intermediarios
            numMaxLinkedNoIntermediary: sample.rangeMaxLinkedNoIntermediary, // Entre empresa e individuos
            numMaxLinkedIndBusInter: sample.rangeMaxLinkedIndBusInter, // Enter empresa / individuos y intermediarios

            perExecuteDeposit: sample.rangeExecuteDeposit,
            perExecuteTransfer: sample.rangeExecuteTransfer,
            perExecuteWithdrawal: sample.rangeExecuteWithdrawal,

            amountSuspiciousOperation: Settings.values.amountSuspiciousOperation,

            rangeAmountTransaction: { start: 0, end: sample.rangeMaxAmountTransaction },

            perNewLinkTransact: sample.rangeNewLinkTransact,

            currentIteration: 0,
            idDatabase: 0,
            totalIterations: 0,

            totalNodes: 0,
            totalEdges: 0

        };
        return argsCreateAgent;
    }
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}