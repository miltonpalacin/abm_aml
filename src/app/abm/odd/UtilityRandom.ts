import crypto from "crypto";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueMap } from "../helper/KeyValueMap";
import { IRange } from "../helper/Types";

export class UtilityRandom {


    public static randomOfKeyValue(array: KeyValueMap<string, string>): KeyValue<string, string> {
        const idx = this.randomRange(0, array.getLength() - 1);
        return array.getByIndex(idx);

    }

    public static randomRange(min: number, max: number, numDec?: number): number {
        if (min === max) return min;
        if (numDec) {
            const factor = Math.pow(10, numDec);
            return crypto.randomInt(min * factor, max * factor) / factor;
        }
        else
            return crypto.randomInt(min, max);
    }

    public static randomRangeMM(minmax: IRange, numDec?: number): number {
        if (minmax.start === minmax.end) return minmax.start;
        if (numDec) {
            const factor = Math.pow(10, numDec);
            return crypto.randomInt(minmax.start * factor, minmax.end * factor) / factor;
        }
        else
            return crypto.randomInt(minmax.start, minmax.end);
    }

    public static randomExp(mean: number, value: number, factor: number = 100): number {

        const x = crypto.randomInt(0 * factor, 1 * factor) / factor;
        return value * (1 - Math.exp(-1 * x * (1 / mean)))

    }

    public static roulettePerOne(percentage: number) {
        const point = this.randomRange(1, 100);
        return point >= 0 && point < percentage;

    }

    public static roundDec(num: number, numDec: number): number {
        const factor = Math.pow(10, numDec);
        return Math.round((num + Number.EPSILON) * factor) / factor;
    }

}