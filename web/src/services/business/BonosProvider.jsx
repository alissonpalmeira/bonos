import React, { createContext, useEffect, useState } from "react";
import { Queries, defaultCredit, defaultWish } from "services/data";
import { useAuth } from "services/auth";
import "assets/flow/config";

export const BonosContext = new createContext([{}, () => {}]);

export const BonosProvider = ({ children }) => {
    const [ state, setState ] = useState({
        initialized: false,
        initializing: false,
        currentCredit: defaultCredit,
        currentWish: defaultWish,
        error: null,
        success: null,
        showTestWarning: true,
        warned: false,
    });
    const { user } = useAuth();

    useEffect(() => {
        if (!user.addr) return;
        if (state.initializing) return;
        checkIsInitialized(user.addr);
    }, [user, state.initializing]);

    useEffect(() => {
        if (user.addr) {
            checkShowTestWarning(user.addr);
        } else {
            setState(state => ({
                ...state,
                showTestWarning: true,
                warned: false,
            }));
        }
    }, [user]);

    useEffect(() => {
        if (!user.addr) return;
        localStorage.setItem(user.addr, state.showTestWarning.toString());
    }, [user, state.showTestWarning]);

    const checkIsInitialized = async (address) => {
        const initialized = await Queries().checkIsInitialized(address);
        setState(state => ({...state, initialized: initialized }));
    }

    const checkShowTestWarning = async (address) => {
        let showTestWarning = localStorage.getItem(address);
        if (showTestWarning) {
            showTestWarning = showTestWarning.toLowerCase() === 'true' ? true : false;
        } else {
            showTestWarning = true;
        }    
        setState(state => ({ ...state, showTestWarning: showTestWarning }));
    };

    return (
        <BonosContext.Provider value={[ state, setState ]}>
            { children }
        </BonosContext.Provider>
    );
};
