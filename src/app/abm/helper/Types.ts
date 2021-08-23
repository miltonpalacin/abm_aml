export interface IRange {
    start: number,
    end: number
}

export interface IRangeMM {
    min: number,
    max: number
}

export interface ITypeSettings {
    totalSimulation: number,
    samplesSize: number,
    rangePropensityFraud: IRange,
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

        rangeHighPropensityFraud: IRange
    },
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

    popColocation: number; // En base a solo individuos y negocios
    popStrucuturation: number; // En base a solo individuos y negocios
    popIntegration: number; // En base a solo individuos y negocios
    popNormal: number; // En base a solo individuos y negocios

    minPropensityFraud: number,
    maxPropensityFraud: number

}