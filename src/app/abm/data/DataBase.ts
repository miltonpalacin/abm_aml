import { Pool } from "pg";
import { BaseOperationAgent } from "../agent/BaseOperationAgent";
import { IntermediaryAgent } from "../agent/IntermediaryAgent";
import { Network } from "../environment/Network";
import { ITypeArgNetwork } from "../helper/Types";
import { TypeOperation } from "./TypeOperation";

const pool = new Pool({
    host: "localhost",
    database: "abm_aml",
    user: "sensor",
    password: "sensor",
    port: 5432
});

async function dbCreateSimulation(keys: ITypeArgNetwork, codProceso: string) {

    try {

        const sql = `
            INSERT INTO public.simulation(
            cod_simulation, fec_reg, total_times, num_pop_individual, num_pop_intermediary, num_pop_noprofit_business,
            num_pop_profit_business, num_pop_trust_business, num_pop_shell_business, num_pop_high_propensity_fraud,
            per_pop_watchlist, max_times_watchlist, max_times_clean_watchlist, max_propensity_fraud, 
            max_high_propensity_fraud, per_linked_intermediary, num_max_linked_nointermediary, 
            num_max_linked_indbusinter, per_execute_deposit, per_execute_transfer, per_execute_withdrawal, 
            amount_suspicious_operation, range_amount_transaction, per_new_link_transact)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING id_simulation`;
        const values = [
            codProceso,
            new Date(),
            keys.totalTimes,

            keys.numPopIndividual,
            keys.numPopIntermediary,

            keys.numPopNoProfitBusiness,
            keys.numPopProfitBusiness,
            keys.numPopTrustBusiness,
            keys.numPopShellBusiness,

            keys.numPopHighPropensityFraud,

            keys.perPopWatchList,
            keys.maxTimesWatchList,
            keys.maxTimesCleanWatchList,

            keys.maxPropensityFraud,
            keys.maxHighPropensityFraud,

            keys.perLinkedIntermediary,
            keys.numMaxLinkedNoIntermediary,
            keys.numMaxLinkedIndBusInter,

            keys.perExecuteDeposit,
            keys.perExecuteTransfer,
            keys.perExecuteWithdrawal,

            keys.amountSuspiciousOperation,

            keys.rangeAmountTransaction.end,

            keys.perNewLinkTransact
        ];
        const result = await pool.query(sql, values)

        const id = result.rows[0]["id_simulation"];

        return id;

    } catch (error) {
        console.log(error);
    }

}

async function dbCreateSimulatioResult(network: Network, idSimulation: number, codProceso: string, startTotalEdges: number, startTotalWachtlist: number) {

    try {

        const sql = `
        INSERT INTO public.simulation_result(
            id_simulation, cod_simulation, fec_reg, 
            total_agent, total_edge_start, total_edge_end, 
            total_watchlist_start, total_watchlist_end, total_deposit, 
            total_transfer, total_withdral, total_illegal, 
            total_legal, total_transact, total_frozen, 
            total_amount_illegal_deposit, total_amount_legal_deposit, total_amount_illegal_transfer, 
            total_amount_legal_transfer, total_amount_illegal_withdrawal, total_amount_legal_withdrawal)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);`;
        const values = [
            idSimulation,
            codProceso,
            new Date(),

            network.nodes.length,
            startTotalEdges,
            network.edges.length,

            startTotalWachtlist,
            network.whachList.length,
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.DEPOSIT)).length,

            network.transactions.filter(t => t.typeMove.equal(TypeOperation.TRANSFER)).length,
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.WITHDRAWAL)).length,
            network.transactions.filter(t => t.isIlegally).length,

            network.transactions.filter(t => !t.isIlegally).length,
            network.transactions.length,
            network.nodes.filter(n => !n.agent.isAgent(IntermediaryAgent) && (<BaseOperationAgent>n.agent).isFrozenAccounts).length,

            network.transactions.filter(t => t.typeMove.equal(TypeOperation.DEPOSIT) && t.isIlegally).reduce((sum, current) => sum + current.amount, 0),
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.DEPOSIT) && !t.isIlegally).reduce((sum, current) => sum + current.amount, 0),
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.TRANSFER) && t.isIlegally).reduce((sum, current) => sum + current.amount, 0),

            network.transactions.filter(t => t.typeMove.equal(TypeOperation.TRANSFER) && !t.isIlegally).reduce((sum, current) => sum + current.amount, 0),
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.WITHDRAWAL) && t.isIlegally).reduce((sum, current) => sum + current.amount, 0),
            network.transactions.filter(t => t.typeMove.equal(TypeOperation.WITHDRAWAL) && !t.isIlegally).reduce((sum, current) => sum + current.amount, 0)
        ];
        await pool.query(sql, values)

    } catch (error) {
        console.log(error);
    }

}

export {
    dbCreateSimulation,
    dbCreateSimulatioResult
};