export class KeyValue<K, V> {

    public _key!: K;
    public _value!: V;

    public constructor(key: K, value: V) {
        this._key = key;
        this._value = value;
    }

    public get key(): K {
        return this._key;
    }

    public get value(): V {
        return this._value;
    }

    public toString(): string {
        return this._key + ": " + this._value;
    }
}