import { ITypeArgNetwork } from "../helper/Types";

export class Setup {

    public global(): void { }


    public local(): ITypeArgNetwork {
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

            rangeAmountTransaction: { min: 0, max: 0 },

            perNewLinkTransact: 0
        };
        return argsCreateAgent;
    }
}