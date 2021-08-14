import { BaseAgent } from "./BaseAgent";

export class Individual extends BaseAgent {

    private predispositionIllegality!: number;

    public build(): this {
        throw new Error("Method not implemented.");
    }

}