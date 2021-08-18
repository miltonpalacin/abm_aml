import crypto from "crypto";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueMap } from "../helper/KeyValueMap";

export class UtilityRandom {


    public static getRandomOfKeyValue(array: KeyValueMap<string, string>): KeyValue<string, string> {
        const idx = this.getRandomRange(0, array.getLength() - 1);
        return array.getByIndex(idx);

    }

    public static getRandomRange(min: number, max: number, numDec?: number): number {
        if (numDec) {
            const factor = Math.pow(10, numDec);
            return crypto.randomInt(min * factor, max * factor) / factor;
        }
        else
            return crypto.randomInt(min, max);
    }

}