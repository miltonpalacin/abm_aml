import { BaseOperationAgent } from "./BaseOperationAgent";

export class IndividualAgent extends BaseOperationAgent {

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
        const code = (++IndividualAgent._orderCreate).toString().padStart(5, "0");
        this.code = "Individuo_" + code;
        this.codeShort = "I_" + code;
    }

    //#####################################
    // MÉTODOS
    //#####################################

}