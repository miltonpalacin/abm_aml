export class KeyValueExtra<K, V, E> {

    public _key!: K;
    public _value!: V;
    public _extra!: E;

    public constructor(key: K, value: V, extra: E) {
        this._key = key;
        this._value = value;
        this._extra = extra;
    }

    public get key(): K {
        return this._key;
    }

    public get value(): V {
        return this._value;
    }

    public get extra(): E {
        return this._extra;
    }

    public toString(): string {
        return this._key + ": " + this._value + ", " + this._extra;
    }
}