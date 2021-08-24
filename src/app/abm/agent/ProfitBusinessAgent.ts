import { BaseOperationAgent } from "./BaseOperationAgent";

export class ProfitBusinessAgent extends BaseOperationAgent {


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
        const code = (++ProfitBusinessAgent._orderCreate).toString().padStart(5, "0");
        this.code = "ProfitBusiness_" + code;
        this.codeShort = "BP_" + code;
    }

    //#####################################
    // MÉTODOS
    //#####################################

}