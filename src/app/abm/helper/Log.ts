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
    type: string;
}

export class Log {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private static _fileName: string;

    private static _logEnabled: boolean = false;

    private static _logCache: Array<LogItemCache> = new Array();

    private static _logCacheEnabled: boolean = false;

    private static _logCacheReady: boolean = false;

    private static _logCacheMaxSize: number;

    private static _orderCache: number = 0;

    //#####################################
    // CONSTUCTOR BUILD
    //####################################

    private static async reBuild() {

        this._logEnabled = config.logEnabled;
        if (!this._logEnabled) return;

        const formatFileName = config.logFileName;
        const matches = formatFileName.match(/{\w+}/);

        if (matches) {
            const format = matches[0];
            const formatDate = (moment(new Date())).format(format);
            this._fileName = path.resolve(config.logPath, config.logFileName);
            this._fileName = this._fileName.replace(format, formatDate).replace("{", "").replace("}", "");

            fs.access(this._fileName, fs.constants.F_OK, (err) => {
                if (!err) {
                    //console.error(`${this._fileName}, archivo ya existe.`);
                    return;
                }

                fs.closeSync(fs.openSync(this._fileName, 'w'));
                //console.log(`${this._fileName}, archivo creado.`);
            });
        }
    }

    private static async reBuildCache() {

        this._logCacheReady = true;

        if (config.logCacheEnabled) {
            this._logCacheEnabled = config.logCacheEnabled;
            this._logCacheMaxSize = config.logCacheMaxSize
            this._logCache = new Array();
        }
    }

    private static build() {
        if (this._fileName) return;
        this.reBuild();
    }

    private static buildCache() {
        if (this._logCacheReady) return;
        this.reBuildCache();
    }


    //#####################################
    // PROPIEDADES
    //####################################

    public static getFileName(): string {
        return this._fileName;
    }

    public static get logCache(): Array<LogItemCache> {
        return Log._logCache;
    }

    //#####################################
    // MÉTODOS
    //####################################

    private static appendCache(message: string, type: LogTypes): void {

        let style = "";

        switch (type) {
            case LogTypes.DEBUG: style = "list-group-item-primary"; break;
            case LogTypes.ERROR: style = "list-group-item-warning"; break;
            case LogTypes.FATAL: style = "list-group-item-danger"; break;
            case LogTypes.INFO: style = "list-group-item-info"; break;
            case LogTypes.SILLY: style = "list-group-item-light"; break;
            case LogTypes.WARM: style = "list-group-item-secondary"; break;

        }

        // list - group - item - primary">A simple primary list group item</a>
        //     < a href = "#" class="list-group-item list-group-item-action list-group-item-secondary" > A simple secondary list group item < /a>
        //         < a href = "#" class="list-group-item list-group-item-action list-group-item-success" > A simple success list group item < /a>
        //             < a href = "#" class="list-group-item list-group-item-action list-group-item-danger" > A simple danger list group item < /a>
        //                 < a href = "#" class="list-group-item list-group-item-action list-group-item-warning" > A simple warning list group item < /a>
        //                     < a href = "#" class="list-group-item list-group-item-action list-group-item-info" > A simple info list group item < /a>
        //                         < a href = "#" class="list-group-item list-group-item-action list-group-item-light" > A simple light list group item < /a>
        //                             < a href = "#" class="list-group-item list-group-item-action list-group-item-dark"

        const item: LogItemCache = {
            message: message,
            isRead: false,
            order: ++this._orderCache,
            type: style
        };

        const len = this._logCache.push(item);

        if (len > this._logCacheMaxSize)
            this._logCache.shift();
    }

    private static addLogCache(type: LogTypes, message: string, detail?: string): void {

        if (!message) return;

        this.buildCache();

        if (!this._logCacheEnabled) return;

        const date = (moment(new Date())).format("YYYY-MM-DD HH:mm:ss.SSS");

        let finalMessage = `${date} ${type} [${message}]`;
        if (detail)
            finalMessage = finalMessage + os.EOL + detail;

        this.appendCache(finalMessage, type);
    }

    private static addLog(type: LogTypes, message: string, detail?: string) {

        if (!message) return;

        this.build();

        if (!this._logEnabled) return;

        const date = (moment(new Date())).format("YYYY-MM-DD HH:mm:ss.SSS");

        let finalMessage = `${date} ${type} [${message}]`;
        if (detail)
            finalMessage = finalMessage + os.EOL + detail;

        fs.appendFile(this._fileName, finalMessage + os.EOL, (err) => {
            if (err) throw err;
        });

        this.buildCache();

        if (!this._logCacheEnabled) return;

        this.appendCache(finalMessage, type);
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
        let listLogs = this._logCache.filter(e => !e.isRead);

        listLogs.forEach(el => {
            const ind = this._logCache.findIndex(e => e.order === el.order);
            if (ind >= 0)
                this._logCache[ind].isRead = true;
        });

        listLogs.sort((a, b) => (a.order < b.order ? -1 : 1));

        return listLogs;

    }

}