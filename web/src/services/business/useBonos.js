import { useCallback, useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries, defaultCredit, defaultWish } from 'services/data';
import * as fcl from '@onflow/fcl';

export const useBonos = () => {
    const [ state, setState ] = useContext(BonosContext);
    const { user } = useAuth();

    const checkIsInitialized = async (address) => {
        const initialized = await Queries().checkIsInitialized(address);
        setState(state => ({...state, initialized: initialized }));
    }

    const initializeAccount = async () => {
        setInitializing(true);
        try {
            const txId = await Mutations().initializeAccount();
            await fcl.tx(txId).onceSealed();
            await checkIsInitialized(user.addr);
        } catch (error) {
            console.error(error);
            setError({
                name: 'Initialization failed',
                message: 'An error occurred when initializing account storage on Flow Blockchain',
            });
        }
        setInitializing(false);
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
        initializeAccount,
        redeemCredit,
        resetCurrentCredit,
        resetCurrentWish,
        setCurrentCredit,
        setCurrentWish,
        setError,
        setSuccess,
        setShowTestWarning,
        upsertWish,
    }
};
