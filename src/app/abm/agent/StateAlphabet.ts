import { IHash } from "../helper/IHash";
import { Alphabet } from "./Alphabet";
import { State } from "./State";

export class StateAlphabet implements IHash {

    private _codeState: string;

    private _codeAlphabet: string;

    private _closeMove: boolean;

    public constructor(state: State, alphabet: Alphabet, closeMove: boolean) {
        this._codeState = state.code;
        this._codeAlphabet = alphabet.code;
        this._closeMove = closeMove;
    }

    public equals(o: any): boolean {
        if (this === o) return true;
        if (o == null || this.constructor.name !== o.constructor.name) return false;
        const state: StateAlphabet = <StateAlphabet>o;
        return this._codeState === state._codeState && this._codeAlphabet === state._codeAlphabet && this._closeMove === state._closeMove;
    }

    public hash(): string {
        return this.constructor.name + "." + this._codeState + "." + this._codeAlphabet + "." + this._closeMove;
    }
}