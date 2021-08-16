import { Ledger } from "./Ledger";
import { KeyValue } from "../helper/KeyValue";
import { BaseAgent } from "./BaseAgent";
import { LevelAml } from "./LevelAml";

export class BusinessAgent extends BaseAgent {

    private typeBusiness!: KeyValue<String, String>;

    
    private isFrozenAccounts!: boolean;

    /** Información de movimientos financieros */
    private ledger!: Ledger;

    /** Nivel dentro del proceso de Anti-Money Laundering */
    private level!: LevelAml;

    /** Predisposición al freaude */
    private predispositionFraud!: number;

    public build(): this {
        throw new Error("Method not implemented.");
    }

}