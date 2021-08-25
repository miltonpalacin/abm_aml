import { IHash } from "./IHash";

export class ArrayList<T extends IHash> extends Array<T> {

    private constructor(items: Array<T>) {
        super(...items)
    }

    static create<T extends IHash>(): ArrayList<T> {
        return Object.create(ArrayList.prototype);
    }

    public contains(value: T): boolean {
        return this.some(e => e.hash() === value.hash())
    }

}