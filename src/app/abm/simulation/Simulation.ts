import { Network } from "../environment/Network";
import { Log } from "../helper/Log";
import { Setup, sleep } from "./Setup";

export class Simulation {

    public static async run() {

        // Tiempo que tiene como unidad un día
        let currentTime: number = 0;

        try {
            /** ********************************************************* */
            /**                   CONFIGURACIÓN GLOBAL                   */
            /** ********************************************************* */

            Log.info("=======================");
            Log.info("Inicio de la simulación");
            Log.info("=======================");

            const config = await Setup.global();
            Log.info("Configuración global: ", config)


            for (let iteration = 0; iteration < config.totalIteration; iteration++) {

                // En cada iteración se re-establece el tiempo
                currentTime = 0;

                /** ********************************************************* */
                /**                    CONFIGURACIÓN LOCAL                    */
                /** ********************************************************* */

                const args = Setup.local(iteration);
                Log.info("Configuración global: ", args);

                const network = new Network(args);

                /** ********************************************************* */
                /**                INICIALIZACIÓN DE AGENTES                  */
                /** ********************************************************* */

                network.createAgents();

                /** ********************************************************* */
                /**                   CREACIÓN DE LA RED                      */
                /** ********************************************************* */

                network.createNetwork();

                /** ******************************************************************* */
                /**                          SIMULAR TRANSACCIONES                      */
                /** ******************************************************************* */

                for (let tick = 1; tick < 100; tick++) {


                    currentTime = tick

                    /** ************************************************************** */
                    /**    OPERACION: DEPOSIT    */
                    /** ************************************************************** */

                    network.createDepositOperacion(currentTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createTransferOperation(currentTime);

                    /** ************************************************************** */
                    /**           OPERACION: TRANSFER, WITHDRAWAL             */
                    /** ************************************************************** */
                    network.createWithdrawalOperation(currentTime);

                    await sleep(100);
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