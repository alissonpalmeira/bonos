import React, { createContext, useEffect, useState } from "react";
import { AuthState } from ".";
import * as fcl from '@onflow/fcl';
import "assets/flow/config";

export const AuthContext = new createContext([{}, () => {}]);

export const AuthProvider = ({ children }) => {
    const [ state, setState ] = useState({
        user: {
            loggedIn: null
        },
        status: null,
        error: null,
        success: null,
    });

    useEffect(() => {
        fcl.currentUser.subscribe(setUser);
    }, []);

    useEffect(() => {
        if (state.user.loggedIn) {
            setState(state => ({ ...state, status: AuthState.SIGNED_IN }));
        } else {
            setState(state => ({ ...state, status: AuthState.SIGNED_OUT }));
        }
    }, [state.user]);

    const setUser = (user) => {
        setState(state => ({ ...state, user: user }));
    }

    return (
        <AuthContext.Provider value={[ state, setState ]}>
            { children }
        </AuthContext.Provider>
    );
};
