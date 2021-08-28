import moment from "moment";
import { dbCreateSimulation } from "../data/DataBase";
import { Network } from "../environment/Network";
import { Log } from "../helper/Log";
import { Setup, sleep } from "./Setup";

export class Simulation {

    public static async run() {

        // Tiempo que tiene como unidad un día
        let currentTime: number = 0;
        const awaitTime = 5;
        const codProceos = (moment(new Date())).format("YYYYMMDDHHmmss");

        try {
            /** ********************************************************* */
            /**                   CONFIGURACIÓN GLOBAL                   */
            /** ********************************************************* */
           

            const config = Setup.global();
            Log.debug("================================================")
            Log.debug(`Inicio de ${config.totalIteration} simulaciones`);
            Log.debug("================================================")
            await sleep(awaitTime);

            for (let iteration = 1; iteration <= config.totalIteration; iteration++) {

                // En cada iteración se re-establece el tiempo
                currentTime = 0;

                Log.info("================================================")
                Log.info(`SIMULACIÓN => ${iteration}`);
                Log.info("================================================")

                /** ********************************************************* */
                /**                    CONFIGURACIÓN LOCAL                    */
                /** ********************************************************* */

                const args = Setup.local(iteration);
                const network = new Network(args);
                const idSimulation = await dbCreateSimulation(args, codProceos);
                Log.info(`ID Simulation [${idSimulation}]`);
                Log.info(`Configuración global de la simulación [${iteration}]`, args);
                await sleep(awaitTime);

                /** ********************************************************* */
                /**                INICIALIZACIÓN DE AGENTES                  */
                /** ********************************************************* */

                network.createAgents();
                Log.info(`Total de agentes creados [${network.nodes.length}]`);
                await sleep(awaitTime);


                /** ********************************************************* */
                /**                   CREACIÓN DE LA RED                      */
                /** ********************************************************* */

                network.createNetwork();
                Log.info(`Red creada con [${network.edges.length}] enalces`);
                await sleep(awaitTime);

                /** ******************************************************************* */
                /**                          SIMULAR TRANSACCIONES                      */
                /** ******************************************************************* */

                for (let tick = 1; tick <= args.totalTimes; tick++) {

                    currentTime = tick

                    Log.warn(`INICIO DÍA => ${tick} DE LA SIMULACIÓN => ${config.totalIteration}`);

                    /** ************************************************************** */
                    /**    OPERACION: DEPOSIT    */
                    /** ************************************************************** */

                    network.createDepositOperacion(currentTime);
                    Log.info(`Depósitos para el día ${tick} de la simulación ${iteration}`);
                    await sleep(awaitTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createTransferOperation(currentTime);
                    Log.info(`Transferencias para el día ${tick} de la simulación ${iteration}`);
                    await sleep(awaitTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createWithdrawalOperation(currentTime);
                    Log.info(`Operaciones para el día ${tick} de la simulación ${iteration}`);
                    await sleep(awaitTime);

                    Log.info(`FIN DÍA => ${tick} DE LA SIMULACIÓN => ${config.totalIteration}`);
                }

                Log.silly(`${network.transactions.length} de transacciones de la simulación ${iteration}`);
                await sleep(awaitTime);
            }

            Log.debug("================================================")
            Log.debug(`Fin de ${config.totalIteration} simulaciones`);
            Log.debug("================================================")
            await sleep(awaitTime);

        } catch (error) {
            Log.fatal(error);
        }
    }

}