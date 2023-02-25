import * as fcl from '@onflow/fcl';
import * as scripts from './scripts';

export const Queries = () => {

    const checkIsInitialized = async (address) => {
        const res = await fcl.query({
            cadence: scripts.IS_INITIALIZED,
            args: (arg, t) => [arg(address, t.Address)],
        });
        // console.log(res);
        return res;
    }
    
    const getCredits = async () => {
        const user = await fcl.currentUser.snapshot();
        const res = await fcl.query({
            cadence: scripts.GET_CREDITS,
            args: (arg, t) => [arg(user.addr, t.Address)],
        });
        // console.log(res);
        return res;
    }

    const getWishlist = async () => {
        const user = await fcl.currentUser.snapshot();
        const res = await fcl.query({
            cadence: scripts.GET_WISHLIST,
            args: (arg, t) => [arg(user.addr, t.Address)],
        });
        // console.log(res);
        return res;
    }

    return {
        checkIsInitialized,
        getCredits,
        getWishlist,
    }
}
