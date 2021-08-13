import * as fs from "fs";
import * as config from "@/config.json";
import path from "path";
import moment from "moment";
import os from "os";

enum LogTypes {
    SILLY = "SILLY",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARM = "WARM",
    ERROR = "ERROR",
    FATAL = "FATAL"
}


export interface LogItemCache {
    message: string;
    isRead: boolean;
    order: number;
}

export class Log {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private static fileName: string;

    private static logEnabled: boolean = false;

    private static logCache: Array<LogItemCache>;

    private static logCacheEnabled: boolean = false;

    private static logCacheReady: boolean = false;

    private static logCacheMaxSize: number;

    private static orderCache: number = 0;

    //#####################################
    // CONSTUCTOR BUILD
    //####################################

    private static async reBuild() {

        this.logEnabled = config.logEnabled;
        if (!this.logEnabled) return;

        const formatFileName = config.logFileName;
        const matches = formatFileName.match(/{\w+}/);

        if (matches) {
            const format = matches[0];
            const formatDate = (moment(new Date())).format(format);
            this.fileName = path.resolve(config.logPath, config.logFileName);
            this.fileName = this.fileName.replace(format, formatDate).replace("{", "").replace("}", "");

            fs.access(this.fileName, fs.constants.F_OK, (err) => {
                if (!err) {
                    console.error(`${this.fileName}, archivo ya existe.`);
                    return;
                }

                fs.closeSync(fs.openSync(this.fileName, 'w'));
                console.log(`${this.fileName}, archivo creado.`);
            });
        }
    }

    private static async reBuildCache() {

        this.logCacheReady = true;

        if (config.logCacheEnabled) {
            this.logCacheEnabled = config.logCacheEnabled;
            this.logCacheMaxSize = config.logCacheMaxSize
            this.logCache = new Array();
        }
    }

    private static build() {
        if (this.fileName) return;
        this.reBuild();
    }

    private static buildCache() {
        if (this.logCacheReady) return;
        this.reBuildCache();
    }


    //#####################################
    // PROPIEDADES
    //####################################

    public static getFileName(): string {
        return this.fileName;
    }

    //#####################################
    // MÉTODOS
    //####################################

    private static appendCache(message: string): void {

        const item: LogItemCache = {
            message: message,
            isRead: false,
            order: ++this.orderCache
        };

        const len = this.logCache.push(item);

        if (len > this.logCacheMaxSize)
            this.logCache.shift();
    }

    private static addLogCache(type: LogTypes, message: string, detail?: string): void {

        if (!message) return;

        this.buildCache();

        if (!this.logCacheEnabled) return;

        const date = (moment(new Date())).format("YYYY-MM-DD HH:mm:ss.SSS");

        let finalMessage = `${date} ${type} [${message}]`;
        if (detail)
            finalMessage = finalMessage + os.EOL + detail;

        this.appendCache(finalMessage);
    }

    private static addLog(type: LogTypes, message: string, detail?: string) {

        if (!message) return;

        this.build();

        if (!this.logEnabled) return;

        const date = (moment(new Date())).format("YYYY-MM-DD HH:mm:ss.SSS");

        let finalMessage = `${date} ${type} [${message}]`;
        if (detail)
            finalMessage = finalMessage + os.EOL + detail;

        fs.appendFile(this.fileName, finalMessage + os.EOL, (err) => {
            if (err) throw err;
        });

        this.buildCache();

        if (!this.logCacheEnabled) return;

        this.appendCache(finalMessage);
    }

    public static silly(message: string): void {
        this.addLog(LogTypes.SILLY, message);
    }

    public static info(message: string, jsonObj?: object): void {
        this.addLog(LogTypes.INFO, message, JSON.stringify(jsonObj, null, 2));
    };

    public static warn(message: string, jsonObj?: object): void {
        this.addLog(LogTypes.WARM, message, JSON.stringify(jsonObj, null, 2));
    };

    public static debug(message: string, jsonObj?: object): void {
        this.addLog(LogTypes.DEBUG, message, JSON.stringify(jsonObj, null, 2));
    };

    public static error(message: string, jsonObj?: object): void {
        this.addLog(LogTypes.ERROR, message, JSON.stringify(jsonObj, null, 2));
    };

    public static fatal(error: Error): void {
        this.addLog(LogTypes.FATAL, error.message, error.stack);
    };


    public static sillyCache(message: string): void {
        this.addLogCache(LogTypes.SILLY, message);
    }

    public static infoCache(message: string, jsonObj?: object): void {
        this.addLogCache(LogTypes.INFO, message, JSON.stringify(jsonObj, null, 2));
    };

    public static warnCache(message: string, jsonObj?: object): void {
        this.addLogCache(LogTypes.WARM, message, JSON.stringify(jsonObj, null, 2));
    };

    public static debugCache(message: string, jsonObj?: object): void {
        this.addLogCache(LogTypes.DEBUG, message, JSON.stringify(jsonObj, null, 2));
    };

    public static errorCache(message: string, jsonObj?: object): void {
        this.addLogCache(LogTypes.ERROR, message, JSON.stringify(jsonObj, null, 2));
    };

    public static fatalCache(error: Error): void {
        this.addLogCache(LogTypes.FATAL, error.message, error.stack);
    };

    public static getNewLogsCache(): LogItemCache[] {
        let listLogs = this.logCache.filter(e => !e.isRead);

        listLogs.forEach(el => {
            const ind = this.logCache.findIndex(e => e.order === el.order);
            if (ind >= 0)
                this.logCache[ind].isRead = true;
        });

        listLogs.sort((a, b) => (a.order < b.order ? -1 : 1));

        return listLogs;

    }


}