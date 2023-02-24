import * as fcl from '@onflow/fcl';
import * as scripts from './scripts';

export const Queries = () => {

    const checkIsInitialized = async (address) => {
        return fcl.query({
            cadence: scripts.IS_INITIALIZED,
            args: (arg, t) => [arg(address, t.Address)],
        });
    }

    return {
        checkIsInitialized,
    }
}
