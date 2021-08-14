/**
 * Tipo de movimiento o transacción de los agentes dentro de ambiente o red (network)
 */

import { MapIndex } from "../helper/MapIndex";

export class TypeMove {

    public static data: MapIndex<string, string> = new MapIndex();

    private static _initialize = (() => {
        TypeMove.data.set("TRANSFER ","Tranferencia");
        TypeMove.data.set("DEPOSIT ","Depósito");
        TypeMove.data.set("WITHDRAWAL ","Retiro");
        TypeMove.data.set("NONE ","Ninguno");
    })();
}