import { BaseAgent } from "./BaseAgent";
import { LevelAml } from "./LevelAml";

export class Individual extends BaseAgent{

    private level!: LevelAml;

    public build(): this {
        throw new Error("Method not implemented.");
    }

}