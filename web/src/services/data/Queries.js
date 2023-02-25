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
    
    const getVouchers = async () => {
        const user = await fcl.currentUser.snapshot();
        const res = await fcl.query({
            cadence: scripts.GET_VOUCHERS,
            args: (arg, t) => [arg(user.addr, t.Address)],
        });
        console.log(res);
        return Object.entries(res).reduce((result, [key, value], index) => {
            if (parseFloat(value) > 0) {
                return {...result, [key]: value};
            }
            return {...result};
        }, {})
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
        getVouchers,
        getWishlist,
    }
}
