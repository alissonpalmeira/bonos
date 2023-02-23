import React, { createContext, useState } from "react";

export const AuthContext = new createContext([{}, () => {}]);

export const AuthProvider = ({ children }) => {
    const [ state, setState ] = useState({
        account: null,
        error: null,
        success: null,
    });

    return (
        <AuthContext.Provider value={[ state, setState ]}>
            { children }
        </AuthContext.Provider>
    );
};
