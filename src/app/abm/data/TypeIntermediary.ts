import { StringMap } from "../helper/StringMap";

export class TypeIntermediary {

    public static data: StringMap = new StringMap();

    private static _initialize = (() => {
        TypeIntermediary.data.set("FORMAL-FS ","Sistema Financiero Formal");
        TypeIntermediary.data.set("INFORMAL-HAWALA ","Sistema Hawal de Transferencia");
        TypeIntermediary.data.set("NONE ","Ninguno");
    })();
}