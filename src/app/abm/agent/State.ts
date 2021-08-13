import { CodeDescription } from "@/app/abm/helper/CodeDescription";

/**
 * Clase que representa a los estados de un agente.
 */
export class State extends CodeDescription {
   
    public toString(): string {
        return "state {code=\'" + this.getCode() + '\'' + ", description=\'" + this.getDescription() + '\'' + '}';
    }

}
