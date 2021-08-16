import { Ledger } from "./Ledger";
import { BaseAgent } from "./BaseAgent";
import { LevelAml } from "./LevelAml";
import { State } from "./State";
import { Alphabet } from "./Alphabet";

export class IndividualAgent extends BaseAgent {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Cuentas congelada por estar en el Whatchr por más de n días continuos */
    private isFrozenAccounts!: boolean;

    /** Información de movimientos financieros */
    private ledger!: Ledger;

    /** Nivel dentro del proceso de Anti-Money Laundering */
    private level!: LevelAml;

    /** Predisposición al freaude */
    private predispositionFraud!: number;


    //#####################################
    // ATRIBUTOS ESTÄTICOS
    //#####################################

    // Estados del agente
    public static Q1_BALANCE: State = new State("q1", "Balance de situación");
    public static Q2_ESPERA: State = new State("q2", "En espera de algúna operación");
    public static Q3_OPERACION: State = new State("q3", "Realizando operación monetaria");
    public static Q4_CONGELADO: State = new State("q4", "Cuentas congeladas");

    // Alfabeto del agente
    public static A1_DESCANSAR: Alphabet = new Alphabet("a1", "Esperar operación");
    public static A2_REALIZAR: Alphabet = new Alphabet("a2", "Realizar operación");
    public static A3_CONGELAR: Alphabet = new Alphabet("a3", "Esperar operación");


    /** Orden de creación */
    private static orderCreate: number = 0;

    //#####################################
    // CONSTRUCTOR y BUILD
    //#####################################
    
    public constructor() {
        super();
        IndividualAgent.orderCreate++;
        const code = IndividualAgent.orderCreate.toString().padStart(5, "0");
        this.setCode("Individuo_" + code);
        this.setCodeShort("I_" + code);
    }


    public build(): this {
        return this;

    }

    //#####################################
    // PROPIEDADES
    //#####################################


    //#####################################
    // MÉTODOS
    //#####################################


}