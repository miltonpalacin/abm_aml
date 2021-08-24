import { BaseOperationAgent } from "./BaseOperationAgent";

export class NoProfitBusinessAgent extends BaseOperationAgent {


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
        const code = (++NoProfitBusinessAgent._orderCreate).toString().padStart(5, "0");
        this.code = "NoProfitBusiness_" + code;
        this.codeShort = "BN_" + code;
    }

    //#####################################
    // MÉTODOS
    //#####################################

}