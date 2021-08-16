import { BaseAgent } from "../agent/BaseAgent";
import { KeyValue } from "../helper/KeyValue";

interface ItemWhachList {

    agent: BaseAgent;
    currentTime: number;

}

export class WhachList {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private arrayHistory!: Array<ItemWhachList>;

    private array!: Array<KeyValue<BaseAgent, number>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this.array = new Array();
        this.arrayHistory = new Array();
    }


    //#####################################
    // MÉTODOS
    //####################################


    public setTime(agent: BaseAgent, currentTime: number): this {
        const index = this.array.findIndex(e => e.key.getCode() === agent.getCode());

        if (index >= 0) {
            let times = this.array[index].value;
            this.array[index] = new KeyValue(agent, ++times);
        }
        else
            this.array.push(new KeyValue(agent, 1))

        const itemHistory: ItemWhachList = {
            agent: agent,
            currentTime: currentTime
        }

        this.arrayHistory.push(itemHistory);

        return this;
    }

    public getItemIndex(index: number): KeyValue<BaseAgent, number> {
        return this.array[index];
    }

    public getTimeByAgent(agent: BaseAgent): number {
        const item = this.array.find(e => e.key.getCode() === agent.getCode());
        if (item === undefined) return 0;
        return item.value;
    }

    public clear(): void { this.array = new Array(); this.arrayHistory = new Array(); }

    public delete(agent: BaseAgent): boolean {
        const index = this.array.findIndex(e => e.key.getCode() === agent.getCode());

        const del = this.array.splice(index, 1);

        const listDelete = this.arrayHistory.filter(e => e.agent.getCode() === agent.getCode());

        listDelete.forEach(el => {
            const idx = this.arrayHistory.findIndex(et => et.agent.getCode() === el.agent.getCode());
            this.arrayHistory.splice(idx, 1);
        });


        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: KeyValue<BaseAgent, number>, index: number, array: KeyValue<BaseAgent, number>[]) => void, thisArg?: any): void {
        this.array.forEach(callbackfn, thisArg);
    }

    public hasAgent(agent: BaseAgent): boolean {
        const item = this.array.find(e => e.key.getCode() === agent.getCode());
        return !(item === undefined)

    }

    public getLength(): number { return this.array.length; }

}