import * as fs from "fs";
import path from "path";
import { ITypeSettings } from "../helper/Types";



export class Settings {

    private static fileName: string = path.resolve("./src/app/abm/simulation", "staticSettings.json");
    private static fileDefaultName: string = path.resolve("./src/app/abm/simulation", "staticDefaultSettings.json");

    public static values: ITypeSettings;

    private static _initialize = (() => { Settings.load(); })();

    private static load(): void {

        const data = fs.readFileSync(this.fileName, 'utf8');
        Settings.values = JSON.parse(data);
    }

    public static save(): void {

        fs.writeFile(this.fileName, JSON.stringify(this.values, null, 2), function (err) {
            if (err) throw err;
            Settings.load();
        });
    }

    private static default(): void {

        const data = fs.readFileSync(this.fileDefaultName, 'utf8');
        Settings.values = JSON.parse(data);
        this.save();
    }

}