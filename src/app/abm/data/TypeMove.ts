/**
 * Tipo de movimiento o transacción de los agentes dentro de ambiente o red (network)
 */

import { KeyValueMap } from "../helper/KeyValueMap";

export class TypeMove {

    public static data: KeyValueMap<string, string> = new KeyValueMap();

    private static _initialize = (() => {
        TypeMove.data.set("TRANSFER ","Tranferencia");
        TypeMove.data.set("DEPOSIT ","Depósito");
        TypeMove.data.set("WITHDRAWAL ","Retiro");
    })();
}