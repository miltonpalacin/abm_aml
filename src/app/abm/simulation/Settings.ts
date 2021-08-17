import * as fs from "fs";
import path from "path";

interface TypeSettings {
    timesSimulation: number,
    yearsSampling: number,
    samplesSize: number,
    population: {
        rateIndividual: number,
        rateBusiness: number,
        rateIntermediary: number,
        inititialIndividual: number,
        initialBusiness: number,
        initialIntermediary: number
    }
}

export class Settings {

    private static fileName: string = path.resolve("./src/app/abm/simulation", "staticSettings.json");
    private static fileDefaultName: string = path.resolve("./src/app/abm/simulation", "staticDefaultSettings.json");

    public static settigsValues: TypeSettings;

    private static _initialize = (() => { Settings.load(); })();

    private static load(): void {

        const data = fs.readFileSync(this.fileName, 'utf8');
        Settings.settigsValues = JSON.parse(data);
    }

    public static save(): void {

        fs.writeFile(this.fileName, JSON.stringify(this.settigsValues, null, 2), function (err) {
            if (err) throw err;
            Settings.load();
        });
    }

    private static default(): void {

        const data = fs.readFileSync(this.fileDefaultName, 'utf8');
        Settings.settigsValues = JSON.parse(data);
        this.save();
    }

}