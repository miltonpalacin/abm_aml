import { CodeDescription } from "@/app/abm/helper/CodeDescription";

/**
 * Clase alfabeto del autómata finito no determinista.
 */
export class Alphabet extends CodeDescription {
    
    public toString(): string {
        return "alphabet {code=\'" + this.code + '\'' + ", description=\'" + this.description + '\'' + '}';
    }

}
