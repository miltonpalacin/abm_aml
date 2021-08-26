import crypto from "crypto";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueMap } from "../helper/KeyValueMap";
import { IRangeMM } from "../helper/Types";

export class UtilityRandom {


    public static getRandomOfKeyValue(array: KeyValueMap<string, string>): KeyValue<string, string> {
        const idx = this.getRandomRange(0, array.getLength() - 1);
        return array.getByIndex(idx);

    }

    public static getRandomRange(min: number, max: number, numDec?: number): number {
        if (min === max) return min;
        if (numDec) {
            const factor = Math.pow(10, numDec);
            return crypto.randomInt(min * factor, max * factor) / factor;
        }
        else
            return crypto.randomInt(min, max);
    }

    public static getRandomRangeMM(minmax: IRangeMM, numDec?: number): number {
        if (minmax.min === minmax.max) return minmax.min;
        if (numDec) {
            const factor = Math.pow(10, numDec);
            return crypto.randomInt(minmax.min * factor, minmax.max * factor) / factor;
        }
        else
            return crypto.randomInt(minmax.min, minmax.max);
    }

    public static getRandomExp(mean: number, value: number, factor: number = 100): number {

        const x = crypto.randomInt(0 * factor, 1 * factor) / factor;
        return value * (1 - Math.exp(-1 * x * (1 / mean)))

    }

}