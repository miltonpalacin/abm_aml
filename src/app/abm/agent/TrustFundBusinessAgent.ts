import { BaseOperationAgent } from "./BaseOperationAgent copy";

export class TrustFundBusinessAgent extends BaseOperationAgent {


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
        const code = (++TrustFundBusinessAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("TrustFundBusiness_" + code);
        this.setCodeShort("BT_" + code);
    }

    //#####################################
    // MÉTODOS
    //#####################################

}