import * as fcl from '@onflow/fcl';
import * as scripts from './scripts';

export const Queries = () => {

    const checkIsInitialized = async (address) => {
        const res = await fcl.query({
            cadence: scripts.IS_INITIALIZED,
            args: (arg, t) => [arg(address, t.Address)],
        });
        console.log(res);
        return res;
    }

    return {
        checkIsInitialized,
    }
}
