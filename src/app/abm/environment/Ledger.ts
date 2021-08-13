import { FinantialEntity } from "./FinantialEntity";
import { Place } from "./Place";


interface MoneyData {
    sourceEntity: FinantialEntity,
    targetEntity: FinantialEntity;
    sourcePlace: Place;
    targetPlace: Place;
    amount: number;
}

export class Ledger {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private income!: Array<MoneyData>;

    private expenditure!: Array<MoneyData>;

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

    public moneyIn(sourceEntity: FinantialEntity, targetEntity: FinantialEntity, sourcePlace: Place, targetPlace: Place, amount: number): void {
        const flow: MoneyData = {
            sourceEntity: sourceEntity,
            targetEntity: targetEntity,
            sourcePlace: sourcePlace,
            targetPlace: targetPlace,
            amount: amount
        };

        this.income.push(flow);
        this.totalMoney += amount;
    }

    public moneyOut(sourceEntity: FinantialEntity, targetEntity: FinantialEntity, sourcePlace: Place, targetPlace: Place, amount: number): void {
        if (!this.hasMoney(amount)) return;

        const flow: MoneyData = {
            sourceEntity: sourceEntity,
            targetEntity: targetEntity,
            sourcePlace: sourcePlace,
            targetPlace: targetPlace,
            amount: amount
        };

        this.expenditure.push(flow);
        this.totalMoney -= amount;
    }

    public hasMoney(amount: number): boolean {
        return (this.totalMoney - amount) >= 0;
    }

    public maxMoney(amount: number): number {
        if (this.hasMoney(amount)) return amount;
        return this.totalMoney;
    }

}