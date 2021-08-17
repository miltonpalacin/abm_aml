import { Ledger } from "./Ledger";
import { ArrayList } from "../helper/ArrayList";
import { HashMap } from "../helper/HashMap";
import { Log } from "../helper/Log";
import { Alphabet } from "./Alphabet";
import { State } from "./State";
import { StateAlphabet } from "./StateAlphabet";
import { KeyValue } from "../helper/KeyValue";
import { IHash } from "../helper/IHash";

export abstract class BaseAgent implements IHash {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    /** Identificador corto de agente */
    private codeShort!: string;

    /** Identificador de agente */
    private code!: string;

    /**  Lugar de de origen del agente. */
    private place!: KeyValue<string, string>;

    /** Dirección de Nodo */
    private nodeAddress!: string;

    //#####################################
    // ATRIBUTOS DE AUTOMATA
    //#####################################

    /** Estados del agente */
    private states!: ArrayList<State>;

    /** Alfabeto/lenguaje del agente */
    private alphabets!: ArrayList<Alphabet>;

    /** Funciones de transición */
    private transitionsFunction!: HashMap<StateAlphabet, State>;

    /** Estado actual del agente */
    private currentState!: State;

    /**  Estado inicial del agente */
    private initialState!: State;

    /** Estados de aceptación */
    private acceptanceStates!: ArrayList<State>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this.states = ArrayList.create();
        this.transitionsFunction = new HashMap();
        this.alphabets = ArrayList.create();
        this.acceptanceStates = ArrayList.create();
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getCodeShort(): string {
        return this.codeShort;
    }

    public setCodeShort(codeShort: string): void {
        this.codeShort = codeShort;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getLocation(): KeyValue<string, string> {
        return this.place;
    }

    public setLocation(place: KeyValue<string, string>): void {
        this.place = place;
    }

    public getCurrentState(): State {
        return this.currentState;
    }

    public setCurrentState(currentState: State): void {
        this.currentState = currentState;
    }

    public getNodeAddress(): string {
        return this.nodeAddress;
    }

    public setNodeAddress(nodeAddress: string): void {
        this.nodeAddress = nodeAddress;
    }

    //#####################################
    // MÉTODOS ABSTRACTOS
    //####################################

    // Método a implementar por todo los agentes
    public abstract build(): this;

    //#####################################
    // MÉTODOS
    //####################################

    public addState(state: State): this {
        if (!this.states.contains(state)) this.states.push(state);
        else Log.warn("Ya existe el estado:  " + state.toString());

        return this;
    }

    protected setInitialState(state: State): void {
        if (this.states.contains(state)) this.initialState = state;
        else Log.warn("No existe el estate: " + state.toString);

    }

    public getInitialState(): State {
        return this.initialState;
    }

    public addAcceptanceStates(state: State): this {
        if (this.states.contains(state)) {
            if (!this.acceptanceStates.contains(state)) this.acceptanceStates.push(state);
            else Log.warn("Ya existe el estado de aceptación: " + state.toString());
        } else Log.warn("No existe el estado: " + state.toString());

        return this;
    }

    public addAlphabet(alphabet: Alphabet): this {
        if (!this.alphabets.contains(alphabet)) this.alphabets.push(alphabet);
        else Log.warn("Ya existe el alfabeto: " + alphabet.toString());

        return this;
    }

    public addTransition(iniState: State, alphabet: Alphabet, outState: State): this {
        if (this.states.contains(iniState)) {
            if (this.alphabets.contains(alphabet)) {
                if (this.states.contains(outState)) {
                    const stateAlphabet: StateAlphabet = new StateAlphabet(iniState, alphabet, iniState.equals(outState));
                    if (!this.transitionsFunction.has(stateAlphabet)) {
                        this.transitionsFunction.set(stateAlphabet, outState);
                    } else
                        Log.warn("Ya existe la transición: (" + iniState.getCode() + "," + alphabet.getCode() + ")" + "=>" + outState);
                } else
                    Log.warn("No se ha declarado el estado final: " + outState.toString());
            } else
                Log.warn("No se ha declarado el alfabeto: de aceptación: " + alphabet.toString());
        } else
            Log.warn("No se ha declarado el estado inicial: " + iniState.toString());
        return this;
    }


    public isAgent(type: string): boolean {
        return type === this.constructor.name;
    }

    public updateEvent(alphabet: Alphabet, closeMove: boolean) {
        if (typeof this.currentState) {
            const stateAlphabet: StateAlphabet = new StateAlphabet(this.currentState, alphabet, closeMove);
            const beforeState: State | undefined = this.currentState;
            this.currentState = this.transitionsFunction.get(stateAlphabet)!;
            Log.warn("Cambio estado: " + this.code + ", de: " + beforeState.getCode() + ", a: " + this.currentState.getCode());
        }
    }

    public hash(): string {
        return this.constructor.name + "." + this.code;
    }
}