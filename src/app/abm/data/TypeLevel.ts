import { KeyValueMap } from "../helper/KeyValueMap";

export class TypeLevel {

    public static data: KeyValueMap<string, string> = new KeyValueMap();

    private static _initialize = (() => {
        TypeLevel.data.set("COLACATION", "Colocación");
        TypeLevel.data.set("STRUCTURATION", "Estructuración");
        TypeLevel.data.set("INTEGRATION", "Integración");
        TypeLevel.data.set("NONE", "Ninguno");
    })();
}