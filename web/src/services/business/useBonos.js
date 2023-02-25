import { useCallback, useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries, defaultVoucher, defaultWish } from 'services/data';
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

    const resetCurrentVoucher = useCallback(() => {
        setState(state => ({ ...state, currentVoucher: defaultVoucher }));
    }, [setState])

    const resetCurrentWish = useCallback(() => {
        setState(state => ({ ...state, currentWish: defaultWish }));
    }, [setState])

    const setCurrentVoucher = (amount, issuer) => {
        setState(state => ({ ...state, currentVoucher: { amount: amount, issuer: issuer} }));
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
        currentVoucher: state.currentVoucher,
        currentWish: state.currentWish,
        initialized: state.initialized,
        initializing: state.initializing,
        initializeAccount,
        resetCurrentVoucher,
        resetCurrentWish,
        setCurrentVoucher,
        setCurrentWish,
        upsertWish,
    }
};
