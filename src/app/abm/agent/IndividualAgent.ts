import { BaseOperationAgent } from "./BaseOperationAgent copy";

export class IndividualAgent extends BaseOperationAgent {

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
        const code = (++IndividualAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("Individuo_" + code);
        this.setCodeShort("I_" + code);
    }

    //#####################################
    // MÉTODOS
    //#####################################

}