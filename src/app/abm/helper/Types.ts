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
    rangePropensityFraud: IRange;
    rangeMaxTimesMaxWatchList: IRange;
    ragenLinkedIntermediary: IRange;
    rangeLinkedNoIntermediary: IRange;
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

    maxPropensityFraud: number;

    perLinkedIntermediary: number;

    numLinkedNoIntermediary: number;


}