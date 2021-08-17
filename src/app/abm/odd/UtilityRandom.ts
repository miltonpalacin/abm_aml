import crypto from "crypto";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueMap } from "../helper/KeyValueMap";

export class UtilityRandom {


    public static getRandomValue(array: KeyValueMap<string, string>): KeyValue<string, string> {
        const idx = array.getLength();
        return array.getByIndex(idx);

    }

    public static gerRandom(min: number, max: number): number {

        return crypto.randomInt(min, max);
    }
}