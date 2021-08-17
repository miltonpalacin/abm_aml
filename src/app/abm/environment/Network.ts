import { IndividualAgent } from "../agent/IndividualAgent";
import { TypePlace } from "../data/TypePlace";
import { ArrayList } from "../helper/ArrayList";
import { UtilityRandom } from "../odd/UtilityRandom";
import { Node } from "./Node";

export class NetworkCreation {

    private node!: ArrayList<Node>;

    public createAgents(popIndivual: number, popBusiness: number, popIntermediary: number): void {

        // Creando nodo individuales
        for (let _ = 0; _ < popIndivual; _++) {
            // Crear agente
            const agent = new IndividualAgent().build();
            agent.setLocation(UtilityRandom.getRandomValue(TypePlace.data))
            agent.setCurrentState(agent.getInitialState());
            // agent.setPredispositionFraud();
            // agent.setLevel();


            //     .set;

        }
    }
}