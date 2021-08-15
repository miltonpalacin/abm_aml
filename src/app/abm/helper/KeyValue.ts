export class KeyValue<K, V> {

    public key!: K;
    public value!: V;

    public constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    public getKey(): K {
        return this.key;
    }

    public getValue(): V {
        return this.value;
    }

    public toString(): string {
        return this.key + ": " + this.value;
    }
}