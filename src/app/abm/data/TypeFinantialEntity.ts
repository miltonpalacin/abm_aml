import { StringMap } from "../helper/StringMap";

export class TypeFinantialEntity {

    public static data: StringMap = new StringMap();

    private static _initialize = (() => {
        TypeFinantialEntity.data.set("BA001", "Banco de Comercio");
        TypeFinantialEntity.data.set("BA002", "Banco de Crédito del Perú");
        TypeFinantialEntity.data.set("BA003", "Banco Interamericano de Finanzas (BanBif)");
        TypeFinantialEntity.data.set("BA004", "Banco Pichincha");
        TypeFinantialEntity.data.set("BA005", "BBVA");
        TypeFinantialEntity.data.set("BA006", "Citibank Perú");
        TypeFinantialEntity.data.set("BA007", "Interbank");
        TypeFinantialEntity.data.set("BA008", "MiBanco");
        TypeFinantialEntity.data.set("BA009", "Scotiabank Perú");
        TypeFinantialEntity.data.set("BA010", "Banco GNB Perú");
        TypeFinantialEntity.data.set("BA011", "Banco Falabella");
        TypeFinantialEntity.data.set("BA012", "Banco Ripley");
        TypeFinantialEntity.data.set("BA013", "Banco Santander Perú");
        TypeFinantialEntity.data.set("BA014", "Banco Azteca");
        TypeFinantialEntity.data.set("BA015", "Bank of China");
        TypeFinantialEntity.data.set("BA016", "ICBC PERU BANK");
        TypeFinantialEntity.data.set("BAE01", "Agrobanco");
        TypeFinantialEntity.data.set("BAE02", "Banco de la Nación");
        TypeFinantialEntity.data.set("BAE03", "COFIDE");
        TypeFinantialEntity.data.set("BAE04", "Fondo MiVivienda");
        TypeFinantialEntity.data.set("EF001", "Amérika");
        TypeFinantialEntity.data.set("EF002", "Crediscotia");
        TypeFinantialEntity.data.set("EF003", "Confianza");
        TypeFinantialEntity.data.set("EF004", "Compartamos");
        TypeFinantialEntity.data.set("EF005", "Credinka");
        TypeFinantialEntity.data.set("EF006", "Efectiva");
        TypeFinantialEntity.data.set("EF007", "Proempresa");
        TypeFinantialEntity.data.set("EF008", "Mitsui Auto Finance");
        TypeFinantialEntity.data.set("EF009", "Oh!");
        TypeFinantialEntity.data.set("EF010", "Qapaq");
        TypeFinantialEntity.data.set("EF011", "TFC");
        TypeFinantialEntity.data.set("CA001", "Arequipa");
        TypeFinantialEntity.data.set("CA002", "Cusco");
        TypeFinantialEntity.data.set("CA003", "Del Santa");
        TypeFinantialEntity.data.set("CA004", "Trujillo");
        TypeFinantialEntity.data.set("CA005", "Huancayo");
        TypeFinantialEntity.data.set("CA006", "Ica");
        TypeFinantialEntity.data.set("CA007", "Maynas");
        TypeFinantialEntity.data.set("CA008", "Paita");
        TypeFinantialEntity.data.set("CA009", "Piura");
        TypeFinantialEntity.data.set("CA010", "Sullana");
        TypeFinantialEntity.data.set("CA011", "Tacna");
        TypeFinantialEntity.data.set("CO001", "Coopac Inkapresta");
        TypeFinantialEntity.data.set("CO002", "Coopac Jaén");
        TypeFinantialEntity.data.set("CO003", "Coopac Arequipayy");
        TypeFinantialEntity.data.set("CO004", "Coopac Heroica");
        TypeFinantialEntity.data.set("CO005", "Coopac Sembrar");
        TypeFinantialEntity.data.set("CO006", "Coopac Grupo");
        TypeFinantialEntity.data.set("CO007", "Coopac Crecemype");
        TypeFinantialEntity.data.set("CO008", "Coopac Altiplano");
        TypeFinantialEntity.data.set("CO009", "Coopac Financoop");
        TypeFinantialEntity.data.set("CO010", "Coopac Amcechan");
        TypeFinantialEntity.data.set("CO011", "Coopac Inversiones");
        TypeFinantialEntity.data.set("CO012", "Coopac Progresa");
        TypeFinantialEntity.data.set("CO013", "Coopac Crecer");
        TypeFinantialEntity.data.set("CO014", "Coopac Horizonte");
        TypeFinantialEntity.data.set("CO015", "Coopac Econopresto");
        TypeFinantialEntity.data.set("CO016", "Coopac Investmind");
        TypeFinantialEntity.data.set("CO017", "Coopac Andreli");
        TypeFinantialEntity.data.set("CO018", "Coopac.Telefonica Del");
        TypeFinantialEntity.data.set("CO019", "Coopac Negocios");
        TypeFinantialEntity.data.set("CO020", "Coopac Ipemec");
        TypeFinantialEntity.data.set("CO021", "Coopac Financenter");
        TypeFinantialEntity.data.set("CO022", "Coopac Bienestar,Desarrollo");
        TypeFinantialEntity.data.set("CO023", "Coopac Integra");
        TypeFinantialEntity.data.set("CO024", "Coopac Unión");
        TypeFinantialEntity.data.set("CO025", "Coopac Yanawara");
        TypeFinantialEntity.data.set("CO026", "Coopac Intercrédito");
        TypeFinantialEntity.data.set("CO027", "Coopac Santa");
        TypeFinantialEntity.data.set("CO028", "Coopac Crezkamos");
        TypeFinantialEntity.data.set("CO029", "Coopac Nuestra");
        TypeFinantialEntity.data.set("CO030", "Coopac Crediconfia");
        TypeFinantialEntity.data.set("CO031", "Coopac Líder");
        TypeFinantialEntity.data.set("00000", "Hawala");
        TypeFinantialEntity.data.set("00000", "Ninguno");

    })();
}