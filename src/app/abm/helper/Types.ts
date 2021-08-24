export interface IRange {
    start: number;
    end: number;
}

export interface IRangeMM {
    min: number;
    max: number;
}

export interface ITypeSettings {
    totalSimulation: number;
    samplesSize: number;
    rangePropensityFraud: IRange;
    maxTimesMaxWatchList: IRange;
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


export interface ITypeCreateAgent {

    popIndivual: number;
    //popBusiness: number;
    popIntermediary: number;

    popNoProfitBusiness: number;
    popProfitBusiness: number;
    popTrustBusiness: number;
    popShellBusiness: number;

    popHighPropensityFraud: number; // En base a solo individuos y negocios

    /**  Porcentaje, debido que solo recién en la creación se tiene el dato del 
     numero de agentes con alta propensión a cometer fraude */
    popWatchList: number;

    maxPropensityFraud: number;


}