import { Pool } from "pg";
import { ITypeArgNetwork } from "../helper/Types";

const pool = new Pool({
    host: "localhost",
    database: "abm_aml",
    user: "sensor",
    password: "sensor",
    port: 5432
});

async function dbCreateSimulation(keys: ITypeArgNetwork) {

    try {

        const sql = `
            INSERT INTO public.simulation(
            total_times, num_pop_indivual, num_pop_intermediary, num_pop_noprofit_business,
            num_pop_profit_business, num_pop_trust_business, num_pop_shell_business, num_pop_high_propensity_fraud,
            per_pop_watchlist, max_times_watchlist, max_times_clean_watchlist, max_propensity_fraud, 
            max_high_propensity_fraud, per_linked_intermediary, num_max_linked_nointermediary, 
            num_max_linked_indbusinter, per_execute_deposit, per_execute_transfer, per_execute_withdrawal, 
            amount_suspicious_operation, range_amount_transaction, per_new_link_transact)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING id_simulation`;
        const values = [
            keys.totalTimes,

            keys.numPopIndivual,
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

            keys.perNewLinkTransact,
        ];
        const result = await pool.query(sql, values)

        const id = result.rows[0]["id_simulation"];

        return id;

    } catch (error) {
        console.log(error);
    }

}

export { dbCreateSimulation };