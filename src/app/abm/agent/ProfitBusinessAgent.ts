import { BaseOperationAgent } from "./BaseOperationAgent copy";

export class ProfitBusinessAgent extends BaseOperationAgent {


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
        const code = (++ProfitBusinessAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("ProfitBusiness_" + code);
        this.setCodeShort("BP_" + code);
    }

    //#####################################
    // MÉTODOS
    //#####################################

}