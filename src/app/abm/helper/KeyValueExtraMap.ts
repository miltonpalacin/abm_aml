import { KeyValueExtra } from "./KeyValueExtra";


export class KeyValueExtraMap<K, V, E> {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _array!: Array<KeyValueExtra<K, V, E>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    // public constructor() {
    //     this._array = new Array();
    // }

    public constructor(array?: Array<KeyValueExtra<K, V, E>>) {

        if (array)
            this._array = array;
        else
            this._array = new Array();

    }

    //#####################################
    // MÉTODOS
    //####################################


    public getByIndex(index: number): KeyValueExtra<K, V, E> {
        return this._array[index];
    }

    public getByKey(key: K): V | undefined {
        const item = this._array.find(e => e.key === key);
        if (item === undefined) return undefined;
        return item.value;
    }

    public clear(): void { this._array = new Array(); }

    public deleteByKey(key: K): boolean {
        const index = this._array.findIndex(e => e.key === key);
        const del = this._array.splice(index, 1);
        return del && del.length > 0;
    }

    public deleteByIndex(index: number): boolean {
        const del = this._array.splice(index, 1);
        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: KeyValueExtra<K, V, E>, index: number, array: KeyValueExtra<K, V, E>[]) => void, thisArg?: any): void {
        this._array.forEach(callbackfn, thisArg);
    }

    public has(key: K): boolean {
        const item = this._array.find(e => e.key === key);
        return !(item === undefined)

    }

    public set(key: K, value: V, extra: E): this {
        const index = this._array.findIndex(e => e.key === key);
        const newItem = new KeyValueExtra(key, value, extra);
        if (index >= 0)
            this._array[index] = newItem

        else
            this._array.push(newItem)
        return this;
    }

    public get length(): number { return this._array.length; }

    public clone(): KeyValueExtraMap<K, V, E> {
        return new KeyValueExtraMap([...this._array]);
    }

}