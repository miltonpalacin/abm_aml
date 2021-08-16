import { KeyValueMap } from "../helper/KeyValueMap";

export class TypeIntermediary {

    public static data: KeyValueMap<string, string> = new KeyValueMap();

    private static _initialize = (() => {
        TypeIntermediary.data.set("FORMAL","Sistema Financiero Formal");
        TypeIntermediary.data.set("INFORMAL","Sistema Informal (Hawala, Otros)");
    })();
}