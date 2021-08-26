export interface IRange {
    start: number;
    end: number;
}

// export interface IRangeExp {
//     start: number;
//     end: number;
// }

export interface IRangeMM {
    min: number;
    max: number;
}

export interface ITypeSettings {
    totalSimulation: number;
    samplesSize: number;
    amountSuspiciousOperation: number;

    rangeMaxTimesWatchList: number;
    rangeMaxTimesCleanWatchList: number;

    rangeAmountTransaction: IRangeMM;
    rangePropensityFraud: IRange;
    rangeMaxTimesMaxWatchList: IRange;
    rangeLinkedIntermediary: IRange;
    rangeMaxLinkedNoIntermediary: IRange;
    rangeMaxLinkedIndBusInter: IRange;
    rangeExecuteTransaction: IRange;
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

        rangeColocation: IRange,
        rangeEstructuration: IRange,
        rangeIntegration: IRange,

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

    perExcecuteTransaction: number;

    amountSuspiciousOperation: number;
    rangeAmountTransaction: IRangeMM;

    perNewLinkTransact: number;

}