import { KeyValue } from "../helper/KeyValue";
import { KeyValueExtraMap } from "../helper/KeyValueExtraMap";
import { TypeBusiness } from "./TypeBusiness";

export class TypeFinantialEntity {

    public static data: KeyValueExtraMap<string, string, KeyValue<String, String>> = new KeyValueExtraMap();

    private static _initialize = (() => {
        
        const formal = TypeBusiness.data.getByKeyTrust("FORMAL");
        const informal = TypeBusiness.data.getByKeyTrust("INFORMAL");

        TypeFinantialEntity.data.set("BA001", "Banco de Comercio", formal);
        TypeFinantialEntity.data.set("BA002", "Banco de Crédito del Perú", formal);
        TypeFinantialEntity.data.set("BA003", "Banco Interamericano de Finanzas (BanBif)", formal);
        TypeFinantialEntity.data.set("BA004", "Banco Pichincha", formal);
        TypeFinantialEntity.data.set("BA005", "BBVA", formal);
        TypeFinantialEntity.data.set("BA006", "Citibank Perú", formal);
        TypeFinantialEntity.data.set("BA007", "Interbank", formal);
        TypeFinantialEntity.data.set("BA008", "MiBanco", formal);
        TypeFinantialEntity.data.set("BA009", "Scotiabank Perú", formal);
        TypeFinantialEntity.data.set("BA010", "Banco GNB Perú", formal);
        TypeFinantialEntity.data.set("BA011", "Banco Falabella", formal);
        TypeFinantialEntity.data.set("BA012", "Banco Ripley", formal);
        TypeFinantialEntity.data.set("BA013", "Banco Santander Perú", formal);
        TypeFinantialEntity.data.set("BA014", "Banco Azteca", formal);
        TypeFinantialEntity.data.set("BA015", "Bank of China", formal);
        TypeFinantialEntity.data.set("BA016", "ICBC PERU BANK", formal);
        TypeFinantialEntity.data.set("BAE01", "Agrobanco, formal", formal);
        TypeFinantialEntity.data.set("BAE02", "Banco de la Nación", formal);
        TypeFinantialEntity.data.set("BAE03", "COFIDE", formal);
        TypeFinantialEntity.data.set("BAE04", "Fondo MiVivienda", formal);
        TypeFinantialEntity.data.set("EF001", "Amérika", formal);
        TypeFinantialEntity.data.set("EF002", "Crediscotia", formal);
        TypeFinantialEntity.data.set("EF003", "Confianza", formal);
        TypeFinantialEntity.data.set("EF004", "Compartamos", formal);
        TypeFinantialEntity.data.set("EF005", "Credinka", formal);
        TypeFinantialEntity.data.set("EF006", "Efectiva", formal);
        TypeFinantialEntity.data.set("EF007", "Proempresa", formal);
        TypeFinantialEntity.data.set("EF008", "Mitsui Auto Finance", formal);
        TypeFinantialEntity.data.set("EF009", "Oh!", formal);
        TypeFinantialEntity.data.set("EF010", "Qapaq", formal);
        TypeFinantialEntity.data.set("EF011", "TFC", formal);
        TypeFinantialEntity.data.set("CA001", "Arequipa", formal);
        TypeFinantialEntity.data.set("CA002", "Cusco", formal);
        TypeFinantialEntity.data.set("CA003", "Del Santa", formal);
        TypeFinantialEntity.data.set("CA004", "Trujillo", formal);
        TypeFinantialEntity.data.set("CA005", "Huancayo", formal);
        TypeFinantialEntity.data.set("CA006", "Ica", formal);
        TypeFinantialEntity.data.set("CA007", "Maynas", formal);
        TypeFinantialEntity.data.set("CA008", "Paita", formal);
        TypeFinantialEntity.data.set("CA009", "Piura", formal);
        TypeFinantialEntity.data.set("CA010", "Sullana", formal);
        TypeFinantialEntity.data.set("CA011", "Tacna", formal);
        TypeFinantialEntity.data.set("CO001", "Coopac Inkapresta", informal);
        TypeFinantialEntity.data.set("CO002", "Coopac Jaén", informal);
        TypeFinantialEntity.data.set("CO003", "Coopac Arequipayy", informal);
        TypeFinantialEntity.data.set("CO004", "Coopac Heroica", informal);
        TypeFinantialEntity.data.set("CO005", "Coopac Sembrar", informal);
        TypeFinantialEntity.data.set("CO006", "Coopac Grupo", informal);
        TypeFinantialEntity.data.set("CO007", "Coopac Crecemype", informal);
        TypeFinantialEntity.data.set("CO008", "Coopac Altiplano", informal);
        TypeFinantialEntity.data.set("CO009", "Coopac Financoop", informal);
        TypeFinantialEntity.data.set("CO010", "Coopac Amcechan", informal);
        TypeFinantialEntity.data.set("CO011", "Coopac Inversiones", informal);
        TypeFinantialEntity.data.set("CO012", "Coopac Progresa", informal);
        TypeFinantialEntity.data.set("CO013", "Coopac Crecer", informal);
        TypeFinantialEntity.data.set("CO014", "Coopac Horizonte", informal);
        TypeFinantialEntity.data.set("CO015", "Coopac Econopresto", informal);
        TypeFinantialEntity.data.set("CO016", "Coopac Investmind", informal);
        TypeFinantialEntity.data.set("CO017", "Coopac Andreli", informal);
        TypeFinantialEntity.data.set("CO018", "Coopac.Telefonica Del", informal);
        TypeFinantialEntity.data.set("CO019", "Coopac Negocios", informal);
        TypeFinantialEntity.data.set("CO020", "Coopac Ipemec", informal);
        TypeFinantialEntity.data.set("CO021", "Coopac Financenter", informal);
        TypeFinantialEntity.data.set("CO022", "Coopac Bienestar,Desarrollo", informal);
        TypeFinantialEntity.data.set("CO023", "Coopac Integra", informal);
        TypeFinantialEntity.data.set("CO024", "Coopac Unión", informal);
        TypeFinantialEntity.data.set("CO025", "Coopac Yanawara", informal);
        TypeFinantialEntity.data.set("CO026", "Coopac Intercrédito", informal);
        TypeFinantialEntity.data.set("CO027", "Coopac Santa", informal);
        TypeFinantialEntity.data.set("CO028", "Coopac Crezkamos", informal);
        TypeFinantialEntity.data.set("CO029", "Coopac Nuestra", informal);
        TypeFinantialEntity.data.set("CO030", "Coopac Crediconfia", informal);
        TypeFinantialEntity.data.set("CO031", "Coopac Líder", informal); // Formal
        TypeFinantialEntity.data.set("00000", "Hawala", informal); // Informal
        TypeFinantialEntity.data.set("00000", "Ninguno", informal);

    })();
}