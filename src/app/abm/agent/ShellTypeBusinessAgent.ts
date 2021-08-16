import { BaseOperationAgent } from "./BaseOperationAgent copy";

export class ShellTypeBusinessAgent extends BaseOperationAgent {


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
        const code = (++ShellTypeBusinessAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("ShellTypeBusiness_" + code);
        this.setCodeShort("BS_" + code);
    }

    //#####################################
    // MÉTODOS
    //#####################################

}