import { IHash } from "../helper/IHash";
import { Alphabet } from "./Alphabet";
import { State } from "./State";

export class StateAlphabet implements IHash {

    private codeState: string;

    private codeAlphabet: string;

    private closeMove: boolean;

    public constructor(state: State, alphabet: Alphabet, closeMove: boolean) {
        this.codeState = state.getCode();
        this.codeAlphabet = alphabet.getCode();
        this.closeMove = closeMove;
    }

    public equals(o: any): boolean {
        if (this === o) return true;
        if (o == null || (<any>this.constructor) !== (<any>o.constructor)) return false;
        const state: StateAlphabet = <StateAlphabet>o;
        return this.codeState === state.codeState && this.codeAlphabet === state.codeAlphabet && this.closeMove === state.closeMove;
    }

    public hash(): string {
        return this.codeState + "." + this.codeAlphabet + "." + this.closeMove;
    }
}