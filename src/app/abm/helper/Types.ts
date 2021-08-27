export interface IRange {
    start: number;
    end: number;
}

// export interface IRangeExp {
//     start: number;
//     end: number;
// }

// export interface IRangeMM {
//     min: number;
//     max: number;
// }

export interface ITypePreSettings {
    rangeMaxTimesWatchList: string;
    rangeMaxTimesCleanWatchList: string;
    rangeAmountTransaction: string;
    rangePropensityFraud: string;
    rangeMaxTimesMaxWatchList: string;
    rangeLinkedIntermediary: string;
    rangeMaxLinkedNoIntermediary: string;
    rangeMaxLinkedIndBusInter: string;
    rangeExecuteDeposit: string;
    rangeExecuteTransfer: string;
    rangeExecuteWithdrawl: string;
    rangeNoNeighbor: string;
    rangeNewLinkTransact: string;
    ratePopulation: string;
    rangeIndividual: string;
    rateBusiness: string;
    rateIntermediary: string;
    rangeNoProfitBusiness: string;
    rangeProfitBusiness: string;
    rangeTrustBusiness: string;
    rangeShellBusiness: string;
    rangeHighPropensityFraud: string;
    rangeWatchList: string;
}

export interface ITypeSettings {
    totalSimulation: number;
    samplesSize: number;
    amountSuspiciousOperation: number;
    rangeMaxTimesWatchList: IRange;
    rangeMaxTimesCleanWatchList: IRange;
    rangeAmountTransaction: IRange;
    rangePropensityFraud: IRange;
    rangeMaxTimesMaxWatchList: IRange;
    rangeLinkedIntermediary: IRange;
    rangeMaxLinkedNoIntermediary: IRange;
    rangeMaxLinkedIndBusInter: IRange;
    rangeExecuteDeposit: IRange;
    rangeExecuteTransfer: IRange;
    rangeExecuteWithdrawl: IRange;
    rangeNoNeighbor: IRange;
    rangeNewLinkTransact: IRange;
    population: {
        rate: IRange,
        rangeIndividual: IRange,
        rateBusiness: IRange,
        rateIntermediary: IRange,
        rangeNoProfitBusiness: IRange,
        rangeProfitBusiness: IRange,
        rangeTrustBusiness: IRange,
        rangeShellBusiness: IRange,
        rangeHighPropensityFraud: IRange,
        rangeWatchList: IRange
    };
}


export interface ITypeArgNetwork {

    numPopIndivual: number;
    //popBusiness: number;
    numPopIntermediary: number;

    numPopNoProfitBusiness: number;
    numPopProfitBusiness: number;
    numPopTrustBusiness: number;
    numPopShellBusiness: number;

    numPopHighPropensityFraud: number; // En base a solo individuos y negocios

    /**  Porcentaje, debido que solo recién en la creación se tiene el dato del 
     numero de agentes con alta propensión a cometer fraude */
    perPopWatchList: number;
    maxTimesWatchList: number;
    maxTimesCleanWatchList: number;

    maxPropensityFraud: number;
    maxHighPropensityFraud: number;

    perLinkedIntermediary: number;
    numMaxLinkedNoIntermediary: number;
    numMaxLinkedIndBusInter: number;

    perExcecuteDeposit: number;
    perExcecuteTransfer: number;
    perExcecuteWithdrawal: number;


    amountSuspiciousOperation: number;
    rangeAmountTransaction: IRange;

    perNewLinkTransact: number;

}