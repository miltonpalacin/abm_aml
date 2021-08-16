/**
 * Tipo de movimiento o transacción de los agentes dentro de ambiente o red (network)
 */

import { KeyValueMap } from "../helper/KeyValueMap";

export class TypeOperation {

    public static data: KeyValueMap<string, string> = new KeyValueMap();

    private static _initialize = (() => {
        TypeOperation.data.set("TRANSFER","Tranferencia");
        TypeOperation.data.set("DEPOSIT","Depósito");
        TypeOperation.data.set("WITHDRAWAL","Retiro");
    })();
}