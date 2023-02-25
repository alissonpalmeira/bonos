import * as fcl from '@onflow/fcl';
import * as transactions from './transactions'; 

export const Mutations = () => {
    const initializeAccount = async () => {
        return fcl.mutate({
            cadence: transactions.INIT_ACCOUNT,
            payer: fcl.authz,
            proposer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 50,
        });
    }

    const upsertWish = async (amount, issuer) => {
        return fcl.mutate({
            cadence: transactions.UPSERT_WISH,
            args: (arg, t) => [arg(amount.toFixed(2), t.UFix64), arg(issuer, t.Address)],
            payer: fcl.authz,
            proposer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 50,
        });
    }

    return {
        initializeAccount,
        upsertWish,
    }
}
