import { BaseAgent } from "../agent/BaseAgent";
import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";

interface ItemWhachList {

    agent: BaseAgent;
    currentTime: number;

}

export class WhachList {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _arrayHistory!: Array<ItemWhachList>;

    private _array!: Array<KeyValueExtra<BaseAgent, number, number>>;

    private _maxCounter!: number;

    private _maxClean!: number;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor(maxCounter: number, maxClean: number) {
        this._maxCounter = maxCounter;
        this._maxClean = maxClean;
        this._array = new Array();
        this._arrayHistory = new Array();
    }


    //#####################################
    // MÉTODOS
    //####################################


    public pushWatchFrozen(agent: BaseAgent, currentTime: number): boolean {
        const index = this._array.findIndex(e => e.key.code === agent.code);
        let times = 0;
        if (index >= 0) {
            const item = this._array[index];
            times = ((currentTime - item.extra) >= this._maxClean) ? 0 : item.value;
            this._array[index] = new KeyValueExtra(agent, ++times, currentTime);
        }
        else
            this._array.push(new KeyValueExtra(agent, ++times, currentTime))

        const itemHistory: ItemWhachList = {
            agent: agent,
            currentTime: currentTime
        }

        this._arrayHistory.push(itemHistory);

        return times >= this._maxCounter;
    }

    public isAgentInWatch(agent: BaseAgent, currentTime: number): boolean {
        const index = this._array.findIndex(e => e.key.code === agent.code);
        if (index >= 0) {
            const lastCurrentTime = this._array[index].extra;
            return (lastCurrentTime === currentTime) || ((currentTime - lastCurrentTime) === 1);
        }
        return false;
    }


    public isFrozenAgent(agent: BaseAgent): boolean {
        const index = this._array.findIndex(e => e.key.code === agent.code);
        if (index >= 0)
            return this._array[index].value >= this._maxCounter;
        return false;
    }
    // public getItemIndex(index: number): KeyValue<BaseAgent, number> {
    //     return this._array[index];
    // }

    // public getWatchByAgent(agent: BaseAgent): number {
    //     const item = this._array.find(e => e.key.code === agent.code);
    //     if (item === undefined) return 0;
    //     return item.value;
    // }

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

    public forEach(callbackfn: (value: KeyValueExtra<BaseAgent, number, number>, index: number, array: KeyValueExtra<BaseAgent, number, number>[]) => void, thisArg?: any): void {
        this._array.forEach(callbackfn, thisArg);
    }

    public hasAgent(agent: BaseAgent): boolean {
        const item = this._array.find(e => e.key.code === agent.code);
        return !(item === undefined)

    }

    public getLength(): number { return this._array.length; }

}