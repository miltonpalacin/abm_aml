import { IHash } from "./IHash";
import { KeyValue } from "./KeyValue";


export class KeyValueMap<K, V> {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _array!: Array<KeyValue<K, V>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this._array = new Array();

    }

    //#####################################
    // MÉTODOS
    //####################################


    public getByIndex(index: number): KeyValue<K, V> {
        return this._array[index];
    }

    public getByKey(key: K): V | undefined {
        const item = this._array.find(e => e.key === key);
        if (item === undefined) return undefined;
        return item.value;
    }

    public getByKeyTrust(key: K): KeyValue<K, V> {
        const item = this._array.find(e => e.key === key);
        return item!;
    }

    public clear(): void { this._array = new Array(); }

    public delete(key: K): boolean {
        const index = this._array.findIndex(e => e.key === key);
        const del = this._array.splice(index, 1);
        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: KeyValue<K, V>, index: number, array: KeyValue<K, V>[]) => void, thisArg?: any): void {
        this._array.forEach(callbackfn, thisArg);
    }


    public has(key: K): boolean {
        const item = this._array.find(e => e.key === key);
        return !(item === undefined)
    }

    public set(key: K, value: V): this {
        const index = this._array.findIndex(e => e.key === key);
        const newItem = new KeyValue(key, value);
        if (index >= 0)
            this._array[index] = newItem

        else
            this._array.push(newItem)
        return this;
    }

    public getLength(): number { return this._array.length; }

}