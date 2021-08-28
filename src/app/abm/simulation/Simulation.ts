import { Network } from "../environment/Network";
import { Log } from "../helper/Log";
import { Setup, sleep } from "./Setup";

export class Simulation {

    public static async run() {

        // Tiempo que tiene como unidad un día
        let currentTime: number = 0;
        const awaitTime = 5;

        try {
            /** ********************************************************* */
            /**                   CONFIGURACIÓN GLOBAL                   */
            /** ********************************************************* */

            // Log.info("=======================");
            Log.info("Inicio de la simulación");
            // Log.info("=======================");

            const config = Setup.global();
            Log.info("Configuración global: ", config)
            await sleep(awaitTime);


            for (let iteration = 0; iteration < config.totalIteration; iteration++) {

                // En cada iteración se re-establece el tiempo
                currentTime = 0;

                /** ********************************************************* */
                /**                    CONFIGURACIÓN LOCAL                    */
                /** ********************************************************* */

                const args = Setup.local(iteration);
                Log.info("Configuración global: ", args);
                await sleep(awaitTime);
                const network = new Network(args);

                /** ********************************************************* */
                /**                INICIALIZACIÓN DE AGENTES                  */
                /** ********************************************************* */

                network.createAgents();
                Log.info("Agentes creados");
                await sleep(awaitTime);

                /** ********************************************************* */
                /**                   CREACIÓN DE LA RED                      */
                /** ********************************************************* */

                network.createNetwork();
                Log.info("Red creada");
                await sleep(awaitTime);

                /** ******************************************************************* */
                /**                          SIMULAR TRANSACCIONES                      */
                /** ******************************************************************* */

                for (let tick = 1; tick < args.totalTimes; tick++) {

                    currentTime = tick

                    /** ************************************************************** */
                    /**    OPERACION: DEPOSIT    */
                    /** ************************************************************** */

                    network.createDepositOperacion(currentTime);
                    Log.info("createDepositOperacion");
                    await sleep(awaitTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createTransferOperation(currentTime);
                    Log.info("createTransferOperation");
                    await sleep(awaitTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createWithdrawalOperation(currentTime);
                    Log.info("createWithdrawalOperation");
                    await sleep(awaitTime);
                }

            }

        } catch (error) {
            Log.fatal(error);
        }
    }

}

// function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }