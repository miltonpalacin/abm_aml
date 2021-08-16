import { BaseOperationAgent } from "./BaseOperationAgent copy";

export class NoProfitBusinessAgent extends BaseOperationAgent {


    //#####################################
    // ATRIBUTOS ESTÄTICOS
    //#####################################

    /** Orden de creación */
    private static orderCreate: number = 0;

    //#####################################
    // CONSTRUCTOR y BUILD
    //#####################################

    public constructor() {
        super();
        const code = (++NoProfitBusinessAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("ProfitBusiness_" + code);
        this.setCodeShort("BN_" + code);
    }

    //#####################################
    // MÉTODOS
    //#####################################

}