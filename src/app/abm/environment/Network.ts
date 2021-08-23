import { BaseOperationAgent } from "../agent/BaseOperationAgent copy";
import { IndividualAgent } from "../agent/IndividualAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "../agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "../agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "../agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "../agent/TrustFundBusinessAgent";
import { ArrayList } from "../helper/ArrayList";
import { ITypeCreateAgent } from "../helper/Types";
import { Odds } from "../odd/Odds";
import { UtilityRandom } from "../odd/UtilityRandom";
import { Host } from "./Host";

export class NetworkCreation {

    private nodes!: ArrayList<Host>;

    public constructor() {
        this.nodes = ArrayList.create();
    }

    public createAgents(args: ITypeCreateAgent): void {

        /** ********************************************************* */
        /**                   CREACIÓN DE AGENTES                     */
        /** ********************************************************* */

        // Crear nodos individuales
        Host.createAgents(args.popIndivual, this.nodes, IndividualAgent);

        // Crear nodos intermediarios
        Host.createAgents(args.popIntermediary, this.nodes, IntermediaryAgent);

        // Crear nodos empresa fines de lucro
        Host.createAgents(args.popProfitBusiness, this.nodes, ProfitBusinessAgent);

        // Crear nodos empresa sin fines de lucro
        Host.createAgents(args.popNoProfitBusiness, this.nodes, NoProfitBusinessAgent);

        // Crear nodos empresa fondo fiduciario
        Host.createAgents(args.popTrustBusiness, this.nodes, TrustFundBusinessAgent);

        // Crear nodos empresa fantasma
        Host.createAgents(args.popShellBusiness, this.nodes, ShellTypeBusinessAgent);

        let arraySelect = this.nodes.filter(e => !e.getAgent().isAgent(IntermediaryAgent));

        /** ********************************************************* */
        /**               CON PREDISPOSICIÓN AL FRAUDE                */
        /** ********************************************************* */

        // Asignación de predisposición al fraude 
        for (let _ = 0; _ < args.popHighPropensityFraud; _++) {
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            let agent = <BaseOperationAgent>arraySelect[idx].getAgent();

            // Asignación de valor predisposición alto
            agent.setPredispositionFraud(UtilityRandom.getRandomRange(args.maxPropensityFraud, Odds.rangePropensityFraud.max, 2));

        }

        this.nodes.filter(e => !e.getAgent().isAgent(IntermediaryAgent))
            .forEach(e => {
                let agent = <BaseOperationAgent>e.getAgent();
                if (agent.getPredispositionFraud() === undefined)

                    // Asignación de valor predisposición baja
                    agent.setPredispositionFraud(UtilityRandom.getRandomRange(Odds.rangePropensityFraud.min, args.maxPropensityFraud, 2));
            });

        /** ********************************************************* */
        /**                    CON NIVEL                              */
        /** ********************************************************* */

        arraySelect = this.nodes.filter(e => !e.getAgent().isAgent(IntermediaryAgent)
            && (<BaseOperationAgent>e.getAgent()).getPredispositionFraud() >= args.maxPropensityFraud);
            
        for (let _ = 0; _ < args.popColocation; _++) {
            const idx = UtilityRandom.getRandomRange(0, arraySelect.length - 1);
            let agent = <BaseOperationAgent>arraySelect[idx].getAgent();

            // Asignación de valor predisposición alto
            agent.setPredispositionFraud(UtilityRandom.getRandomRange(args.maxPropensityFraud, Odds.rangePropensityFraud.max, 2));

        }


    }


}