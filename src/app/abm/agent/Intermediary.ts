import { BaseAgent } from "./BaseAgent";

export class Intermediary extends BaseAgent {

    private predispositionIllegality!: boolean;

    public build(): this {
        throw new Error("Method not implemented.");
    }
}