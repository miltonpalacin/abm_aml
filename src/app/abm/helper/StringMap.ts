import { StringItem } from "./StringItem";


export class StringMap {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private array!: Array<StringItem>;

    //#####################################
    // CONSTRUCTOR
    //#####################################


    public constructor() {
        this.array = new Array();

    }

    //#####################################
    // MÉTODOS
    //####################################


    public getByIndex(index: number): StringItem {
        return this.array[index];
    }

    public getByKey(key: string): string | undefined {
        const item = this.array.find(e => e.key === key);
        if (item === undefined) return undefined;
        return item.value;
    }

    public clear(): void { this.array = new Array(); }

    public delete(key: string): boolean {
        const index = this.array.findIndex(e => e.key === key);
        const del = this.array.splice(index, 1);
        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: StringItem, index: number, array: StringItem[]) => void, thisArg?: any): void {
        this.array.forEach(callbackfn, thisArg);
    }


    public has(key: string): boolean {
        const item = this.array.find(e => e.key === key);
        return !(item === undefined)

    }

    public set(key: string, value: string): this {
        const index = this.array.findIndex(e => e.key === key);
        const newItem = new StringItem(key, value);
        if (index >= 0)
            this.array[index] = newItem

        else
            this.array.push(newItem)
        return this;
    }

    public getLength(): number { return this.array.length; }

}