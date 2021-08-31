export interface IRange {
    start: number;
    end: number;
}

export interface ITypePreSettings {
    rangeMaxTimesWatchList: number;
    rangeMaxTimesCleanWatchList: number;
    rangeMaxAmountTransaction: number;
    rangePropensityFraud: number;
    rangeLinkedIntermediary: number;
    rangeMaxLinkedNoIntermediary: number;
    rangeMaxLinkedIndBusInter: number;
    rangeExecuteDeposit: number;
    rangeExecuteTransfer: number;
    rangeExecuteWithdrawal: number;
    //rangeNoNeighbor: number;
    rangeNewLinkTransact: number;
    rangePopulation: number;
    rangeIndividual: number;
    rangeBusiness: number;
    rangeIntermediary: number;
    rangeNoProfitBusiness: number;
    rangeProfitBusiness: number;
    rangeTrustBusiness: number;
    rangeShellBusiness: number;
    rangeHighPropensityFraud: number;
    rangeWatchList: number;
}

export interface ITypeSettings {
    totalTimes: number;
    totalIterations: number;
    amountSuspiciousOperation: number;
    rangeMaxTimesWatchList: IRange;
    rangeMaxTimesCleanWatchList: IRange;
    rangeMaxAmountTransaction: IRange;
    rangePropensityFraud: IRange;
    rangeMaxTimesMaxWatchList: IRange;
    rangeLinkedIntermediary: IRange;
    rangeMaxLinkedNoIntermediary: IRange;
    rangeMaxLinkedIndBusInter: IRange;
    rangeExecuteDeposit: IRange;
    rangeExecuteTransfer: IRange;
    rangeExecuteWithdrawal: IRange;
    //rangeNoNeighbor: IRange;
    rangeNewLinkTransact: IRange;
    population: {
        range: IRange,
        rangeIndividual: IRange,
        rangeBusiness: IRange,
        rangeIntermediary: IRange,
        rangeNoProfitBusiness: IRange,
        rangeProfitBusiness: IRange,
        rangeTrustBusiness: IRange,
        rangeShellBusiness: IRange,
        rangeHighPropensityFraud: IRange,
        rangeWatchList: IRange
    };
}

export interface ITypeArgNetwork {

    totalTimes: Number;

    numPopIndividual: number;
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

    perExecuteDeposit: number;
    perExecuteTransfer: number;
    perExecuteWithdrawal: number;


    amountSuspiciousOperation: number;
    rangeAmountTransaction: IRange;

    perNewLinkTransact: number;

    currentIteration: number;
    idDatabase: number;
    totalIterations: number;
    
    totalNodes: number;
    totalEdges: number;

}

export interface INodeInfo {
    code: string;
    codeShort: string;
    placeAgent: string;
    placeNode: string;
    amountIn: number;
    amountOut: number;
    totalIllegalIn: number;
    totalIllegalOut: number;
    isFrozen: boolean;
    entityFinantial: string;
}