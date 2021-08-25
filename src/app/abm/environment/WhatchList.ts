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

    private _arrayHistory!: Array<ItemWhachList>;

    private _array!: Array<KeyValue<BaseAgent, number>>;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this._array = new Array();
        this._arrayHistory = new Array();
    }


    //#####################################
    // MÉTODOS
    //####################################


    public pushWatch(agent: BaseAgent, currentTime: number): this {
        const index = this._array.findIndex(e => e.key.code === agent.code);

        if (index >= 0) {
            let times = this._array[index].value;
            this._array[index] = new KeyValue(agent, ++times);
        }
        else
            this._array.push(new KeyValue(agent, 1))

        const itemHistory: ItemWhachList = {
            agent: agent,
            currentTime: currentTime
        }

        this._arrayHistory.push(itemHistory);

        return this;
    }

    public getItemIndex(index: number): KeyValue<BaseAgent, number> {
        return this._array[index];
    }

    public getWatchByAgent(agent: BaseAgent): number {
        const item = this._array.find(e => e.key.code === agent.code);
        if (item === undefined) return 0;
        return item.value;
    }

    public clear(): void { this._array = new Array(); this._arrayHistory = new Array(); }

    public delete(agent: BaseAgent): boolean {
        const index = this._array.findIndex(e => e.key.code === agent.code);

        const del = this._array.splice(index, 1);

        const listDelete = this._arrayHistory.filter(e => e.agent.code === agent.code);

        listDelete.forEach(el => {
            const idx = this._arrayHistory.findIndex(et => et.agent.code === el.agent.code);
            this._arrayHistory.splice(idx, 1);
        });

        return del && del.length > 0;
    }

    public forEach(callbackfn: (value: KeyValue<BaseAgent, number>, index: number, array: KeyValue<BaseAgent, number>[]) => void, thisArg?: any): void {
        this._array.forEach(callbackfn, thisArg);
    }

    public hasAgent(agent: BaseAgent): boolean {
        const item = this._array.find(e => e.key.code === agent.code);
        return !(item === undefined)

    }

    public getLength(): number { return this._array.length; }

}