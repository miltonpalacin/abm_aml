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

        const arrayIndBuss = this.nodes.filter(e => !e.getAgent().isAgent(IntermediaryAgent));

        for (let _ = 0; _ < args.popHighPropensityFraud; _++) {
            const idx = UtilityRandom.getRandomRange(0, arrayIndBuss.length);
            let agent = <BaseOperationAgent>arrayIndBuss[idx].getAgent();
            // agent.setPredispositionFraud(args.maxPropensityFraud, Odds.rangePropensityFraud.max, 2);

        }
    }


}