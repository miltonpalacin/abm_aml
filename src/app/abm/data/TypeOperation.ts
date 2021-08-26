/**
 * Tipo de movimiento o transacción de los agentes dentro de ambiente o red (network)
 */

import { KeyValue } from "../helper/KeyValue";

export class TypeOperation {

    //public static data: KeyValueMap<string, string> = new KeyValueMap();

    public static TRANSFER: KeyValue<string, string>;
    public static DEPOSIT: KeyValue<string, string>;
    public static WITHDRAWAL: KeyValue<string, string>;

    private static _initialize = (() => {
        TypeOperation.TRANSFER = new KeyValue("TRANSFER", "Tranferencia");
        TypeOperation.DEPOSIT = new KeyValue("DEPOSIT", "Depósito");
        TypeOperation.WITHDRAWAL = new KeyValue("WITHDRAWAL", "Retiro");
    })();
}