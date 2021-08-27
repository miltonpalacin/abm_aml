import { Network } from "../environment/Network";
import { Log } from "../helper/Log";
import { Setup, sleep } from "./Setup";

export class Simulation {

    public static async run() {

        // const setup = new Setup();
        let currentTime: number = 0;

        try {
            /** ********************************************************* */
            /**                   CONFIGURACIÓN GLOBAL                   */
            /** ********************************************************* */

            const config = await Setup.global();

            for (let iteration = 1; iteration < config.totalIteration; iteration++) {


                currentTime = 0;

                /** ********************************************************* */
                /**                    CONFIGURACIÓN LOCAL                    */
                /** ********************************************************* */

                const args = Setup.local(iteration);
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