import { StringMap } from "../helper/StringMap";

export class TypeBusiness {

    public static data: StringMap = new StringMap();

    private static _initialize = (() => {
        TypeBusiness.data.set("FOR-PROFIT ","Con fines de lucro");
        TypeBusiness.data.set("NO-PROFIT ","Sin fines de lucro");
        TypeBusiness.data.set("TRUST-FUND ","Fondo Fiduciario");
        TypeBusiness.data.set("SHELL-TYPE ","Negocio tipo fantasma");
        TypeBusiness.data.set("NONE ","Ninguno");
    })();
}