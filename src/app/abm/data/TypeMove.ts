/**
 * Tipo de movimiento o transacción de los agentes dentro de ambiente o red (network)
 */

import { StringMap } from "../helper/StringMap";

export class TypeMove {

    public static data: StringMap = new StringMap();

    private static _initialize = (() => {
        TypeMove.data.set("TRANSFER ","Tranferencia");
        TypeMove.data.set("DEPOSIT ","Depósito");
        TypeMove.data.set("WITHDRAWAL ","Retiro");
        TypeMove.data.set("NONE ","Ninguno");
    })();
}