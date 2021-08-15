export class KeyValueExtra<K, V, E> {

    public key!: K;
    public value!: V;
    public extra!: E;

    public constructor(key: K, value: V, extra: E) {
        this.key = key;
        this.value = value;
        this.extra = extra;
    }

    public getKey(): K {
        return this.key;
    }

    public getValue(): V {
        return this.value;
    }

    public getExtra(): E {
        return this.extra;
    }

    public toString(): string {
        return this.key + ": " + this.value + ", " + this.extra;
    }
}