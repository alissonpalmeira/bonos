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
        try {
            setInitializing(true);
            const txId = await Mutations().initializeAccount();
            await fcl.tx(txId).onceSealed();
            await checkIsInitialized(user.addr);
            setInitializing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const redeemCredit = async (amount, issuer) => {
        try {
            const txId = await Mutations().redeemCredit(amount, issuer);
            await fcl.tx(txId).onceSealed();
        } catch (error) {
            console.error(error);
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

    const setInitializing = (value) => {
        setState(state => ({ ...state, initializing: value }));
    }

    const upsertWish = async (amount, issuer) => {
        try {
            const txId = await Mutations().upsertWish(amount, issuer);
            await fcl.tx(txId).onceSealed();
        } catch (error) {
            console.error(error);
        }
    }

    return {
        currentCredit: state.currentCredit,
        currentWish: state.currentWish,
        initialized: state.initialized,
        initializing: state.initializing,
        initializeAccount,
        redeemCredit,
        resetCurrentCredit,
        resetCurrentWish,
        setCurrentCredit,
        setCurrentWish,
        upsertWish,
    }
};
