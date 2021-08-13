import { IHash } from "./IHash";

export class HashMap<K extends IHash, V> {

    private map!: Map<K, V>;

    public constructor() {
        this.map = new Map();

    }

    public clear(): void { this.map.clear(); }

    public delete(key: K): boolean { return this.map.delete(key); }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.map.forEach(callbackfn, thisArg);
    }

    public get(key: K): V | undefined { return this.map.get(key); }

    public has(key: IHash): boolean {
        const keys = this.map.keys();
        let anotherKey;

        while (anotherKey = <IHash>keys.next().value)
            if (key.hash() === anotherKey.hash()) return true;

        return false;
    }

    public set(key: K, value: V): this { this.map.set(key, value); return this; }

}