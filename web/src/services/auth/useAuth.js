import { useContext } from "react";
import { AuthContext } from ".";
import * as fcl from '@onflow/fcl';

export const useAuth = () => {
    // eslint-disable-next-line
    const [ state, setState ] = useContext(AuthContext);

    const signIn = () => {
        fcl.logIn();
    }

    const signOut = () => {
        fcl.unauthenticate();
        setState(state => ({...state, user: { loggedIn: null } }));
    }

    const signUp = () => {
        fcl.signUp();
    }

    return {
        user: state.user,
        status: state.status,
        signIn,
        signOut,
        signUp,
    }
};
