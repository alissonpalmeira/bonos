import * as fcl from '@onflow/fcl';
import * as transactions from './transactions'; 

export const Mutations = () => {
    const initializeAccount = async () => {
        const txId = fcl.mutate({
            cadence: transactions.INIT_ACCOUNT,
            payer: fcl.authz,
            proposer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 50,
        });
        // This method waits for the transaction to be mined (sealed)
        await fcl.tx(txId).onceSealed();
    }

    return {
        initializeAccount,
    }
}
