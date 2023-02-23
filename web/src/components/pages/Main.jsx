import React, { useEffect }  from 'react';
import { useAuth, AuthState } from 'services/auth';
import { Outlet, useNavigate } from 'react-location';

export const Main = () => {
    const { status } = useAuth();
    const navigate = useNavigate();

    // console.log(user);
    
    useEffect(() => {
        if (status === AuthState.SIGNED_OUT) {
            navigate({
                to: 'account',
                replace: true,
            });
        } else if (status === AuthState.SIGNED_IN) {
            navigate({
                to: 'case',
                replace: true,
            });
        }
    }, [status, navigate]);

    return(
        <>
            <Outlet />  
        </>
    )
}
