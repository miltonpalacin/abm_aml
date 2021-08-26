/**
 * Localización del agente detro de red de manera referencial 
 */

import { KeyValue } from "../helper/KeyValue";
import { KeyValueMap } from "../helper/KeyValueMap";

export class TypePlace {

    public static data: KeyValueMap<string, string> = new KeyValueMap();
    public static DESCONOCIDO: KeyValue<string, string>;

    private static _initialize = (() => {
        TypePlace.data.set("U01", "Amazonas");
        TypePlace.data.set("U02", "Ancash");
        TypePlace.data.set("U03", "Apurimac");
        TypePlace.data.set("U04", "Arequipa");
        TypePlace.data.set("U05", "Ayacucho");
        TypePlace.data.set("U06", "Cajamarca");
        TypePlace.data.set("U07", "Callao");
        TypePlace.data.set("U08", "Cusco");
        TypePlace.data.set("U09", "Huancavelica");
        TypePlace.data.set("U10", "Huanuco");
        TypePlace.data.set("U11", "Ica");
        TypePlace.data.set("U12", "Junin");
        TypePlace.data.set("U13", "La Libertad");
        TypePlace.data.set("U14", "Lambayeque");
        TypePlace.data.set("U15", "Lima");
        TypePlace.data.set("U16", "Loreto");
        TypePlace.data.set("U17", "Madre de Dios");
        TypePlace.data.set("U18", "Moquegua");
        TypePlace.data.set("U19", "Pasco");
        TypePlace.data.set("U20", "Piura");
        TypePlace.data.set("U21", "Puno");
        TypePlace.data.set("U22", "San Martin");
        TypePlace.data.set("U23", "Tacna");
        TypePlace.data.set("U24", "Tumbes");
        TypePlace.data.set("U25", "Ucayali");
        TypePlace.data.set("U99", "Externo");

        TypePlace.DESCONOCIDO = new KeyValue("U00", "Desconocido");
    })();

}