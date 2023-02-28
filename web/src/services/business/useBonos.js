import { useCallback, useContext } from 'react';
import { BonosContext } from '.';
import { Mutations, defaultCredit, defaultWish } from 'services/data';
import * as fcl from '@onflow/fcl';

export const useBonos = () => {
    const [ state, setState ] = useContext(BonosContext);

    const initializeAccount = async () => {
        setInitializing(true);
        try {
            const txId = await Mutations().initializeAccount();
            await fcl.tx(txId).onceSealed();
            // await checkIsInitialized(user.addr);
            setInitializing(false);
        } catch (error) {
            console.error(error);
            setInitializing(false);
            setError({
                name: 'Initialization failed',
                message: 'An error occurred when initializing account storage on Flow Blockchain',
            });
        }
    }

    const redeemCredit = async (amount, issuer) => {
        try {
            const txId = await Mutations().redeemCredit(amount, issuer);
            await fcl.tx(txId).onceSealed();
            setSuccess({
                name: 'Redemption successful',
                message: `You redeemed USD ${amount} from ${issuer}`,
            });
        } catch (error) {
            console.error(error);
            setError({
                name: 'Redeem failed',
                message: `An error occurred when redeeming credits at ${issuer}`,
            });
        }
    }

    const resetCurrentCredit = useCallback(() => {
        setState(state => ({ ...state, currentCredit: defaultCredit }));
    }, [setState])

    const resetCurrentWish = useCallback(() => {
        setState(state => ({ ...state, currentWish: defaultWish }));
    }, [setState])

    const setCurrentCredit = (amount, issuer) => {
        setState(state => ({ ...state, currentCredit: { amount: amount, issuer: issuer} }));
    }

    const setCurrentWish = (amount, issuer) => {
        setState(state => ({ ...state, currentWish: { amount: amount, issuer: issuer} }));
    }

    const setError = (error) => {
        setState(state => ({ ...state, error: error }));
    };

    const setInitializing = (value) => {
        setState(state => ({ ...state, initializing: value }));
    }    

    const setSuccess = (success) => {
        setState(state => ({ ...state, success: success }));
    };

    const setShowTestWarning = (value) => {
        setState(state => ({ ...state, showTestWarning: value }));
    };

    const setWarned = (value) => {
        setState(state => ({ ...state, warned: value }));
    };

    const upsertWish = async (amount, issuer) => {
        try {
            const txId = await Mutations().upsertWish(amount, issuer);
            await fcl.tx(txId).onceSealed();
        } catch (error) {
            console.error(error);
            setError({
                name: 'Add wish failed',
                message: `An error occurred when adding credit wish to ${issuer}`,
            });
        }
    }

    return {
        currentCredit: state.currentCredit,
        currentWish: state.currentWish,
        initialized: state.initialized,
        initializing: state.initializing,
        error: state.error,
        success: state.success,
        showTestWarning: state.showTestWarning,
        warned: state.warned,
        initializeAccount,
        redeemCredit,
        resetCurrentCredit,
        resetCurrentWish,
        setCurrentCredit,
        setCurrentWish,
        setError,
        setSuccess,
        setShowTestWarning,
        setWarned,
        upsertWish,
    }
};
