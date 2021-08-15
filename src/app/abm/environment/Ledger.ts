import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";

export interface IMoneyData {

    sourceEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    targetEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    sourcePlace: KeyValue<String, String>;
    targetPlace: KeyValue<String, String>;
    currentTime: number;
    amount: number;

}

export class Ledger {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private income!: Array<IMoneyData>;

    private expenditure!: Array<IMoneyData>;

    private totalMoney!: number;

    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this.income = new Array();
        this.expenditure = new Array();
        this.totalMoney = 0;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public getTotalMoney(): number {
        return this.totalMoney;
    }

    //#####################################
    // MÉTODOS
    //####################################

    public moneyIn(moneyData: IMoneyData): void {

        if (!(moneyData && moneyData.amount > 0)) return;

        const flow: IMoneyData = {
            sourceEntity: moneyData.sourceEntity,
            targetEntity: moneyData.targetEntity,
            sourcePlace: moneyData.sourcePlace,
            targetPlace: moneyData.targetPlace,
            currentTime: moneyData.currentTime,
            amount: moneyData.amount
        };

        this.income.push(flow);
        this.totalMoney += moneyData.amount;
    }

    public moneyOut(moneyData: IMoneyData): void {

        if (!(moneyData && moneyData.amount > 0)) return;

        if (!this.hasMoney(moneyData.amount)) return;

        const flow: IMoneyData = {
            sourceEntity: moneyData.sourceEntity,
            targetEntity: moneyData.targetEntity,
            sourcePlace: moneyData.sourcePlace,
            targetPlace: moneyData.targetPlace,
            currentTime: moneyData.currentTime,
            amount: moneyData.amount
        };

        this.expenditure.push(flow);
        this.totalMoney -= moneyData.amount;
    }

    public hasMoney(amount: number): boolean {
        return (this.totalMoney - amount) >= 0;
    }

    public maxMoney(amount: number): number {
        if (this.hasMoney(amount)) return amount;
        return this.totalMoney;
    }

}