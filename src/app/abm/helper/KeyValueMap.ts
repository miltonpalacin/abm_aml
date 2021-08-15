import { IHash } from "./IHash";
import { KeyValue } from "./KeyValue";


export class KeyValueMap<K, V> {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private array!: Array<KeyValue<K, V>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this.array = new Array();

    }

    //#####################################
    // MÉTODOS
    //####################################


    public getByIndex(index: number): KeyValue<K, V> {
        return this.array[index];
    }

    public getByKey(key: K): V | undefined {
        const item = this.array.find(e => e.key === key);
        if (item === undefined) return undefined;
        return item.value;
    }

    public getByKeyTrust(key: K): KeyValue<K, V> {
        const item = this.array.find(e => e.key === key);
        return item!;
    }

    public clear(): void { this.array = new Array(); }

    public delete(key: K): boolean {
        const index = this.array.findIndex(e => e.key === key);
        const del = this.array.splice(index, 1);
        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: KeyValue<K, V>, index: number, array: KeyValue<K, V>[]) => void, thisArg?: any): void {
        this.array.forEach(callbackfn, thisArg);
    }


    public has(key: K): boolean {
        const item = this.array.find(e => e.key === key);
        return !(item === undefined)

    }

    public set(key: K, value: V): this {
        const s = <IHash><unknown>key;
        const index = this.array.findIndex(e => e.key === key);
        const newItem = new KeyValue(key, value);
        if (index >= 0)
            this.array[index] = newItem

        else
            this.array.push(newItem)
        return this;
    }

    public getLength(): number { return this.array.length; }

}