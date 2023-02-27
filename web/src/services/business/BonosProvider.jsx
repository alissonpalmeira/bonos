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
    });
    const { user } = useAuth();

    useEffect(() => {
        const checkInit = async () => {
            const initialized = await Queries().checkIsInitialized(user.addr);
            setState(state => ({ ...state, initialized: initialized }));
        }
        if (user.addr) checkInit();
    }, [user]);

    useEffect(() => {
        if (!user.addr) return;
        let showTestWarning = localStorage.getItem(user.addr);
        if (showTestWarning) {
            showTestWarning = showTestWarning.toLowerCase() === 'true' ? true : false;
        } else {
            showTestWarning = true;
        }    
        console.log(showTestWarning);
        setState(state => ({ ...state, showTestWarning: showTestWarning }));
    }, [user]);

    useEffect(() => {
        if (!user.addr) return;
        localStorage.setItem(user.addr, state.showTestWarning.toString());
    }, [user, state.showTestWarning]);

    return (
        <BonosContext.Provider value={[ state, setState ]}>
            { children }
        </BonosContext.Provider>
    );
};
