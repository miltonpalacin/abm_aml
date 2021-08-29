export class KeyValue<K, V> {

    private _key!: K;
    private _value!: V;

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


    public equal(other: KeyValue<K, V>): boolean {
        return this._key === other.key;
    }

    public toString(): string {
        return this._key + ": " + this._value;
    }
}