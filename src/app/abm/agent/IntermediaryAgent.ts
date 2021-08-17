import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";
import { Alphabet } from "./Alphabet";
import { BaseAgent } from "./BaseAgent";
import { State } from "./State";

export class IntermediaryAgent extends BaseAgent {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** El nodo esta asociado a una cuenta de una entidada financiera  */
    private finantialEntity!: KeyValueExtra<string, string, KeyValue<String, String>>;

    //#####################################
    // ATRIBUTOS ESTÄTICOS
    //#####################################

    // Estados del agente
    public static Q1_ACTUALIZACION: State = new State("q1", "Actualización/creación de cuentas");
    public static Q2_ESPERA_OPERACION: State = new State("q2", "En espera de algúna operación");
    public static Q3_REALIZANOD_OPERACION: State = new State("q3", "Realizando operación");

    // Alfabeto del agente
    public static A1_ESPERAR: Alphabet = new Alphabet("a1", "Esperar operación");
    public static A2_REALIZAR: Alphabet = new Alphabet("a2", "Realizar operación");

    /** Orden de creación */
    private static orderCreate: number = 0;

    //#####################################
    // CONSTRUCTOR y BUILD
    //#####################################

    public constructor() {
        super();
        const code = (++IntermediaryAgent.orderCreate).toString().padStart(5, "0");
        this.setCode("Individuo_" + code);
        this.setCodeShort("M_" + code);
    }


    public build(): this {

        // Agregando estados del agente
        this
            .addState(IntermediaryAgent.Q1_ACTUALIZACION)
            .addState(IntermediaryAgent.Q2_ESPERA_OPERACION)
            .addState(IntermediaryAgent.Q3_REALIZANOD_OPERACION);

        // Estableciendo el estado inicial
        this.setInitialState(IntermediaryAgent.Q1_ACTUALIZACION);

        // Agregar alfabeto
        this
            .addAlphabet(IntermediaryAgent.A1_ESPERAR)
            .addAlphabet(IntermediaryAgent.A2_REALIZAR);

        // Agregar funciones de transición
        this
            .addTransition(IntermediaryAgent.Q1_ACTUALIZACION, IntermediaryAgent.A1_ESPERAR, IntermediaryAgent.Q2_ESPERA_OPERACION)
            .addTransition(IntermediaryAgent.Q1_ACTUALIZACION, IntermediaryAgent.A2_REALIZAR, IntermediaryAgent.Q3_REALIZANOD_OPERACION)
            .addTransition(IntermediaryAgent.Q2_ESPERA_OPERACION, IntermediaryAgent.A1_ESPERAR, IntermediaryAgent.Q2_ESPERA_OPERACION)
            .addTransition(IntermediaryAgent.Q2_ESPERA_OPERACION, IntermediaryAgent.A2_REALIZAR, IntermediaryAgent.Q3_REALIZANOD_OPERACION)
            .addTransition(IntermediaryAgent.Q3_REALIZANOD_OPERACION, IntermediaryAgent.A1_ESPERAR, IntermediaryAgent.Q2_ESPERA_OPERACION)
            .addTransition(IntermediaryAgent.Q3_REALIZANOD_OPERACION, IntermediaryAgent.A2_REALIZAR, IntermediaryAgent.Q3_REALIZANOD_OPERACION);


        // Agregar estados de aceptación

        this
            .addAcceptanceStates(IntermediaryAgent.Q2_ESPERA_OPERACION);

        return this;

    }

    //#####################################
    // PROPIEDADES
    //#####################################


    //#####################################
    // MÉTODOS
    //#####################################

}