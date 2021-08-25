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
    private _codeShort!: string;

    /** Identificador de agente */
    private _code!: string;

    /**  Lugar de de origen del agente. */
    private _place!: KeyValue<string, string>;

    /** Dirección de Nodo */
    private _nodeAddress!: string;

    //#####################################
    // ATRIBUTOS DE AUTOMATA
    //#####################################

    /** Estados del agente */
    private _states!: ArrayList<State>;


    /** Alfabeto/lenguaje del agente */
    private _alphabets!: ArrayList<Alphabet>;


    /** Funciones de transición */
    private _transitionsFunction!: HashMap<StateAlphabet, State>;


    /** Estado actual del agente */
    private _currentState!: State;


    /**  Estado inicial del agente */
    private _initialState!: State;


    /** Estados de aceptación */
    private _acceptanceStates!: ArrayList<State>;


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

    public get codeShort(): string {
        return this._codeShort;
    }

    protected set codeShort(value: string) {
        this._codeShort = value;
    }

    public get code(): string {
        return this._code;
    }

    protected set code(value: string) {
        this._code = value;
    }

    public get place(): KeyValue<string, string> {
        return this._place;
    }

    public set place(value: KeyValue<string, string>) {
        this._place = value;
    }

    public get nodeAddress(): string {
        return this._nodeAddress;
    }

    public set nodeAddress(value: string) {
        this._nodeAddress = value;
    }

    public get states(): ArrayList<State> {
        return this._states;
    }

    public set states(value: ArrayList<State>) {
        this._states = value;
    }

    public get alphabets(): ArrayList<Alphabet> {
        return this._alphabets;
    }

    public set alphabets(value: ArrayList<Alphabet>) {
        this._alphabets = value;
    }

    public get transitionsFunction(): HashMap<StateAlphabet, State> {
        return this._transitionsFunction;
    }

    public set transitionsFunction(value: HashMap<StateAlphabet, State>) {
        this._transitionsFunction = value;
    }

    public get currentState(): State {
        return this._currentState;
    }

    public set currentState(value: State) {
        this._currentState = value;
    }

    public get initialState(): State {
        return this._initialState;
    }

    // public set initialState(value: State) {
    //     this._initialState = value;
    // }

    public get acceptanceStates(): ArrayList<State> {
        return this._acceptanceStates;
    }

    public set acceptanceStates(value: ArrayList<State>) {
        this._acceptanceStates = value;
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
        if (this.states.contains(state)) this._initialState = state;
        else Log.warn("No existe el estate: " + state.toString);

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
                        Log.warn("Ya existe la transición: (" + iniState.code + "," + alphabet.code + ")" + "=>" + outState);
                } else
                    Log.warn("No se ha declarado el estado final: " + outState.toString());
            } else
                Log.warn("No se ha declarado el alfabeto: de aceptación: " + alphabet.toString());
        } else
            Log.warn("No se ha declarado el estado inicial: " + iniState.toString());
        return this;
    }


    public isAgent<T>(type: { new(): T; }): boolean {
        return this instanceof type;
    }


    public updateEvent(alphabet: Alphabet, closeMove: boolean) {
        if (typeof this.currentState) {
            const stateAlphabet: StateAlphabet = new StateAlphabet(this.currentState, alphabet, closeMove);
            const beforeState: State | undefined = this.currentState;
            this.currentState = this.transitionsFunction.get(stateAlphabet)!;
            Log.warn("Cambio estado: " + this.code + ", de: " + beforeState.code + ", a: " + this.currentState.code);
        }
    }

    public hash(): string {
        return this.constructor.name + "." + this.code;
    }

    public equal(agent: BaseAgent): boolean {
        return agent.code === this.code;
    }

    public getClass(): string {
        return this.constructor.name;
    }

    public static getClass(): string {
        return this.name;
    }
}