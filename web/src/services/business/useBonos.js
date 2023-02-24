import { useContext } from 'react';
import { BonosContext } from '.';
import { useAuth } from 'services/auth';
import { Mutations, Queries } from 'services/data';

export const useBonos = () => {
    const [ state, setState ] = useContext(BonosContext);
    const { user } = useAuth();

    const checkInit = async () => {
        const initialized = await Queries().checkIsInitialized(user.addr);
        setState(state => ({ ...state, initialized: initialized }));
    }

    const initializeAccount = async () => {
        try {
            await Mutations().initializeAccount();
            await checkInit();
        } catch (error) {
            console.error(error);
        }
    }

    return {
        address: user.addr,
        initialized: state.initialized,
        initializeAccount,
    }
};
