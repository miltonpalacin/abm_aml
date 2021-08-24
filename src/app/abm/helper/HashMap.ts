import { IHash } from "./IHash";

export class HashMap<K extends IHash, V> {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _map!: Map<K, V>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this._map = new Map();

    }

    //#####################################
    // MÉTODOS
    //####################################

    public clear(): void { this._map.clear(); }

    public delete(key: K): boolean { return this._map.delete(key); }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this._map.forEach(callbackfn, thisArg);
    }

    public get(key: K): V | undefined { return this._map.get(key); }

    public has(key: K): boolean {
        const keys = this._map.keys();
        let anotherKey;

        while (anotherKey = <IHash>keys.next().value)
            if (key.hash() === anotherKey.hash()) return true;

        return false;
    }

    public set(key: K, value: V): this { this._map.set(key, value); return this; }

    public getLength(): number { return this._map.size; }

}