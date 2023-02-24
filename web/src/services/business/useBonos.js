import { useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries } from 'services/data';
import * as fcl from '@onflow/fcl';

export const useBonos = () => {
    const [ state, setState ] = useContext(BonosContext);
    const { user } = useAuth();

    const checkInit = async () => {
        const initialized = await Queries().checkIsInitialized(user.addr);
        setState(state => ({...state, initialized: initialized }));
    }

    const initializeAccount = async () => {
        try {
            setInitializing(true);
            const txId = await Mutations().initializeAccount();
            await fcl.tx(txId).onceSealed();
            await checkInit();
            setInitializing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const setInitializing = (value) => {
        setState(state => ({ ...state, initializing: value }));
    }

    return {
        address: user.addr,
        initialized: state.initialized,
        initializing: state.initializing,
        initializeAccount,
    }
};
