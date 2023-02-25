import React, { createContext, useEffect, useState } from "react";
import { Queries, defaultVoucher, defaultWish } from "services/data";
import { useAuth } from "services/auth";
import "assets/flow/config";

export const BonosContext = new createContext([{}, () => {}]);

export const BonosProvider = ({ children }) => {
    const [ state, setState ] = useState({
        initialized: false,
        initializing: false,
        currentVoucher: defaultVoucher,
        currentWish: defaultWish,
    });
    const { user } = useAuth();

    useEffect(() => {
        const checkInit = async () => {
            const initialized = await Queries().checkIsInitialized(user.addr);
            setState(state => ({ ...state, initialized: initialized }));
        }
        if (user.addr) checkInit();
    }, [user]);

    return (
        <BonosContext.Provider value={[ state, setState ]}>
            { children }
        </BonosContext.Provider>
    );
};
