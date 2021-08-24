import { BaseOperationAgent } from "./BaseOperationAgent";

export class ShellTypeBusinessAgent extends BaseOperationAgent {


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
        const code = (++ShellTypeBusinessAgent._orderCreate).toString().padStart(5, "0");
        this.code = "ShellTypeBusiness_" + code;
        this.codeShort = "BS_" + code;
    }

    //#####################################
    // MÉTODOS
    //#####################################

}