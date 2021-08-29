import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtra } from "../helper/KeyValueExtra";

export interface IMoneyData {

    sourceEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    targetEntity: KeyValueExtra<string, string, KeyValue<String, String>>;
    sourceLocation: KeyValue<String, String>;
    targetLocation: KeyValue<String, String>;
    currentTime: number;
    amount: number;
    isIllegaly: boolean;

}

export class Ledger {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private _income!: Array<IMoneyData>;

    private _expenditure!: Array<IMoneyData>;

    private _totalMoney!: number;


    //#####################################
    // CONSTRUCTOR
    //#####################################

    public constructor() {
        this._income = new Array();
        this._expenditure = new Array();
        this._totalMoney = 0;
    }

    //#####################################
    // PROPIEDADES
    //####################################

    public get totalMoney(): number {
        return this._totalMoney;
    }

    //#####################################
    // MÉTODOS
    //####################################

    public moneyIn(moneyData: IMoneyData): void {

        if (!(moneyData && moneyData.amount > 0)) return;

        this._income.push(moneyData);
        this._totalMoney += moneyData.amount;
    }

    public moneyOut(moneyData: IMoneyData): void {

        if (!(moneyData && moneyData.amount > 0)) return;

        if (!this.hasMoney(moneyData.amount)) return;

        this._expenditure.push(moneyData);
        this._totalMoney -= moneyData.amount;
    }

    public hasMoney(amount: number): boolean {
        return (this.totalMoney - amount) >= 0;
    }

    public maxMoney(amount: number): number {
        if (this.hasMoney(amount)) return amount;
        return this.totalMoney;
    }

    public get totalOut(): number {
        return this._expenditure.reduce((s, c) => s + c.amount, 0);
    }

    public get totalIn(): number {
        return this._income.reduce((s, c) => s + c.amount, 0);
    }

    public get totalIllegalOut(): number {
        return this._expenditure.filter(f => f.isIllegaly).reduce((s, c) => s + c.amount, 0);
    }

    public get totalIllegalIn(): number {
        return this._income.filter(f => f.isIllegaly).reduce((s, c) => s + c.amount, 0);
    }

}