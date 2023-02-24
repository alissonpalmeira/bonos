import React, { useContext, useEffect }  from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { Outlet, useNavigate } from 'react-location';
import { useAuth, AuthState } from 'services/auth';
import { useBonos } from 'services/business';

export const Main = () => {
    const { status } = useAuth();
    const { initialized } = useBonos();
    const navigate = useNavigate();
    const screenSize = useContext(ResponsiveContext);

    // console.log(user);
    // console.log(initialized);
    
    useEffect(() => {
        if (status === AuthState.SIGNED_OUT) {
            navigate({ to: 'account', replace: true });
        } else if (status === AuthState.SIGNED_IN) {
            if (initialized) {
                navigate({ to: 'case', replace: true });
            } else {
                navigate({ to: 'initialize', replace: true });
            }
        }
    }, [status, initialized, navigate]);

    return(
        <Box
            align='center'
            background='brand'
            fill
            justify='center'
        >
            <Box
                background='background'
                basis={ screenSize==='small' ? 'full' : '3/4' }
                fill={ screenSize==='small' ? true : false }
                gap='xsmall'
                height={{ min: 'medium', max: 'large' }}
                // pad={{ horizontal: 'small', top: 'small' }}
                round={ screenSize==='small' ? false : 'medium' }
                width={ screenSize==='small' ? { min: 'small', max: 'medium' } : 'medium' }
            >
                <Outlet />
            </Box>  
        </Box>
    )
}
