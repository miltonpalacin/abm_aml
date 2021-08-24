import { Ledger } from "./Ledger";
import { BaseAgent } from "./BaseAgent";
import { KeyValue } from "../helper/KeyValue";
import { State } from "./State";
import { Alphabet } from "./Alphabet";

export class BaseOperationAgent extends BaseAgent {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Cuentas congelada por estar en el Whatchr por más de n días continuos */
    private _isFrozenAccounts!: boolean;

    /** Información de movimientos financieros */
    private _ledger!: Ledger;

    /** Predisposición al freaude */
    private _predispositionFraud!: number;

    //#####################################
    // ATRIBUTOS ESTÄTICOS
    //#####################################

    // Estados del agente
    public static Q1_BALANCE_SITUACION: State = new State("q1", "Balance de situación");
    public static Q2_ESPERA_OPERACION: State = new State("q2", "En espera de algúna operación");
    public static Q3_REALIZANOD_OPERACION: State = new State("q3", "Realizando operación");
    public static Q4_CUENTA_CONGELADA: State = new State("q4", "Cuentas congeladas");

    // Alfabeto del agente
    public static A1_ESPERAR: Alphabet = new Alphabet("a1", "Esperar operación");
    public static A2_REALIZAR: Alphabet = new Alphabet("a2", "Realizar operación");
    public static A3_CONGELAR: Alphabet = new Alphabet("a3", "Esperar operación");

    //#####################################
    // CONSTRUCTOR y BUILD
    //#####################################


    public build(): this {

        // Agregando estados del agente
        this
            .addState(BaseOperationAgent.Q1_BALANCE_SITUACION)
            .addState(BaseOperationAgent.Q2_ESPERA_OPERACION)
            .addState(BaseOperationAgent.Q3_REALIZANOD_OPERACION)
            .addState(BaseOperationAgent.Q4_CUENTA_CONGELADA);

        // Estableciendo el estado inicial
        this.setInitialState(BaseOperationAgent.Q1_BALANCE_SITUACION);

        // Agregar alfabeto
        this
            .addAlphabet(BaseOperationAgent.A1_ESPERAR)
            .addAlphabet(BaseOperationAgent.A2_REALIZAR)
            .addAlphabet(BaseOperationAgent.A3_CONGELAR);

        // Agregar funciones de transición
        this
            .addTransition(BaseOperationAgent.Q1_BALANCE_SITUACION, BaseOperationAgent.A1_ESPERAR, BaseOperationAgent.Q2_ESPERA_OPERACION)
            .addTransition(BaseOperationAgent.Q1_BALANCE_SITUACION, BaseOperationAgent.A2_REALIZAR, BaseOperationAgent.Q3_REALIZANOD_OPERACION)
            .addTransition(BaseOperationAgent.Q2_ESPERA_OPERACION, BaseOperationAgent.A1_ESPERAR, BaseOperationAgent.Q2_ESPERA_OPERACION)
            .addTransition(BaseOperationAgent.Q2_ESPERA_OPERACION, BaseOperationAgent.A2_REALIZAR, BaseOperationAgent.Q3_REALIZANOD_OPERACION)
            .addTransition(BaseOperationAgent.Q3_REALIZANOD_OPERACION, BaseOperationAgent.A1_ESPERAR, BaseOperationAgent.Q2_ESPERA_OPERACION)
            .addTransition(BaseOperationAgent.Q3_REALIZANOD_OPERACION, BaseOperationAgent.A2_REALIZAR, BaseOperationAgent.Q3_REALIZANOD_OPERACION)
            .addTransition(BaseOperationAgent.Q3_REALIZANOD_OPERACION, BaseOperationAgent.A3_CONGELAR, BaseOperationAgent.Q4_CUENTA_CONGELADA);


        // Agregar estados de aceptación

        this
            .addAcceptanceStates(BaseOperationAgent.Q2_ESPERA_OPERACION)
            .addAcceptanceStates(BaseOperationAgent.Q4_CUENTA_CONGELADA);

        return this;

    }

    //#####################################
    // PROPIEDADES
    //#####################################

    public get isFrozenAccounts(): boolean {
        return this._isFrozenAccounts;
    }

    public set isFrozenAccounts(value: boolean) {
        this._isFrozenAccounts = value;
    }
    public get ledger(): Ledger {
        return this._ledger;
    }

    public set ledger(value: Ledger) {
        this._ledger = value;
    }
    
    public get predispositionFraud(): number {
        return this._predispositionFraud;
    }
    
    public set predispositionFraud(value: number) {
        this._predispositionFraud = value;
    }


}