import { Ledger } from "./Ledger";
import { BaseAgent } from "./BaseAgent";
import { LevelAml } from "./LevelAml";

export class IndividualAgent extends BaseAgent {


    // /** Cuentas en la entidad financiera */
    // private accountFinantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>[];

    private isInWatchList!: boolean;

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