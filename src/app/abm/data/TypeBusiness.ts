import { KeyValueMap } from "../helper/KeyValueMap";

export class TypeBusiness {

    public static data: KeyValueMap<string, string> = new KeyValueMap();

    private static _initialize = (() => {
        TypeBusiness.data.set("FORPROFIT ", "Con Fines de Lucro");
        TypeBusiness.data.set("NOPROFIT ", "Sin Fines de Lucro");
        TypeBusiness.data.set("TRUSTFUND ", "Fondo Fiduciario");
        TypeBusiness.data.set("SHELLTYPE ", "Negocio Fantasma");
    })();
}