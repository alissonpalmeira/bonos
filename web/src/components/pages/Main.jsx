import React, { useContext, useEffect }  from 'react';
import { Box, Notification, ResponsiveContext } from 'grommet';
import { Outlet, useNavigate } from 'react-location';
import { useAuth, AuthState } from 'services/auth';
import { useBonos } from 'services/business';

const Main = () => {
    const { status } = useAuth();
    const { error, success, initialized, showTestWarning, warned, setSuccess, setError } = useBonos();
    const navigate = useNavigate();
    const screenSize = useContext(ResponsiveContext);

    // console.log(user);
    // console.log('initialized', initialized);
    
    useEffect(() => {
        if (status === AuthState.SIGNED_OUT) {
            navigate({ to: 'account', replace: true });
        } else if (status === AuthState.SIGNED_IN) {
            if (showTestWarning && !warned) {
                navigate({ to: 'warning', replace: true });
            }
            else if (!initialized) {
                navigate({ to: 'initialize', replace: true });
            } else {
                navigate({ to: 'case', replace: true });
            }
        }
    }, [status, showTestWarning, warned, initialized, navigate]);

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
                round={ screenSize==='small' ? false : 'medium' }
                width={ screenSize==='small' ? { min: 'small', max: 'medium' } : 'medium' }
            >
                <Outlet />
            </Box>  

            { success && (
                <Notification
                    toast
                    status='normal'
                    title={success.name}
                    message={success.message}
                    onClose={() => setSuccess(null)}
                />
            )}

            { error && (
                <Notification
                    toast
                    status='critical'
                    title={error.name}
                    message={error.message}
                    onClose={() => setError(null)}
                />
            )}
        </Box>
    )
}

export default Main;