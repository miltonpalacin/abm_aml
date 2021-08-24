import { ITypeCreateAgent } from "../helper/Types";

export class Setup {

    public global(): void { }


    public local(): ITypeCreateAgent {
        const argsCreateAgent: ITypeCreateAgent = {
            popIndivual: 0,

            //popBusiness: number;
            popIntermediary: 0,
        
            popNoProfitBusiness: 0,
            popProfitBusiness: 0,
            popTrustBusiness: 0,
            popShellBusiness: 0,
        
            popHighPropensityFraud: 0, // En base a solo individuos y negocios
        
            /**  Porcentaje, debido que solo recién en la creación se tiene el dato del 
             numero de agentes con alta propensión a cometer fraude */
            popWatchList: 0,
        
            maxPropensityFraud: 0
        };
        return argsCreateAgent;
    }
}