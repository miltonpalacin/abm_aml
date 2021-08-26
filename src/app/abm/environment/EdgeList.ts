import { BaseAgent } from "../agent/BaseAgent";
import { Edge } from "./Edge";

export class EdgeList extends Array<Edge> {

    private constructor(items: Array<Edge>) {
        super(...items)
    }

    static create(): EdgeList {
        return Object.create(EdgeList.prototype);
    }

    public contains(edge: Edge): boolean {

        return this.some(e => e.equal(edge));
    }

    public filterByAgent(agent: BaseAgent): Array<Edge> {
        return this.filter(e => e.oneNode.agent.equal(agent) || e.twoNode.agent.equal(agent));
    }


    public setValid(edge: Edge): this {

        if (!this.contains(edge)) this.push(edge)
        return this;
    }

}