import { useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries, defaultWish } from 'services/data';
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
    const resetCurrentWish = () => {
        setState(state => ({ ...state, currentWish: defaultWish }));
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
        currentWish: state.currentWish,
        initialized: state.initialized,
        initializing: state.initializing,
        initializeAccount,
        resetCurrentWish,
        upsertWish,
    }
};
