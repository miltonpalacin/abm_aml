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

            maxPropensityFraud: 0,

            perLinkedIntermediary: 0,

            numLinkedNoIntermediary: 0
        };
        return argsCreateAgent;
    }
}