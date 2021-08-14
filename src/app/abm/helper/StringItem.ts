export class StringItem {

    public key!: string;
    public value!: string;

    public constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    public getKey(): string {
        return this.key;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.key + ": " + this.value;
    }
}