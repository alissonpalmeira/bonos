import { useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries } from 'services/data';
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

    const setInitializing = (value) => {
        setState(state => ({ ...state, initializing: value }));
    }

    return {
        initialized: state.initialized,
        initializing: state.initializing,
        initializeAccount,
    }
};
