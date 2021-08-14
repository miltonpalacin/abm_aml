import { IHash } from "./IHash";
import { ItemMap } from "./ItemMap";


export class MapIndex<K, V> {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private array!: Array<ItemMap<K, V>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################


    public constructor() {
        this.array = new Array();

    }

    //#####################################
    // MÉTODOS
    //####################################


    public getByIndex(index: number): ItemMap<K, V> {
        return this.array[index];
    }

    public getByKey(key: K): V | undefined {
        const item = this.array.find(e => e.key === key);
        if (item === undefined) return undefined;
        return item.value;
    }

    public clear(): void { this.array = new Array(); }

    public delete(key: K): boolean {
        const index = this.array.findIndex(e => e.key === key);
        const del = this.array.splice(index, 1);
        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: ItemMap<K, V>, index: number, array: ItemMap<K, V>[]) => void, thisArg?: any): void {
        this.array.forEach(callbackfn, thisArg);
    }


    public has(key: K): boolean {
        const item = this.array.find(e => e.key === key);
        return !(item === undefined)

    }

    public set(key: K, value: V): this {
        const index = this.array.findIndex(e => e.key === key);
        const newItem = new ItemMap(key, value);
        if (index >= 0)
            this.array[index] = newItem

        else
            this.array.push(newItem)
        return this;
    }

    public getLength(): number { return this.array.length; }

}