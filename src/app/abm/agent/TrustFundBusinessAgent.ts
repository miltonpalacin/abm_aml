import { BaseOperationAgent } from "./BaseOperationAgent";

export class TrustFundBusinessAgent extends BaseOperationAgent {


    //#####################################
    // ATRIBUTOS ESTÄTICOS
    //#####################################

    /** Orden de creación */
    private static _orderCreate: number = 0;

    //#####################################
    // CONSTRUCTOR y BUILD
    //#####################################

    public constructor() {
        super();
        const code = (++TrustFundBusinessAgent._orderCreate).toString().padStart(5, "0");
        this.code = "TrustFundBusiness_" + code;
        this.codeShort = "BT_" + code;
    }

    //#####################################
    // MÉTODOS
    //#####################################

}