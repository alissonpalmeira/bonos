import React from 'react';
import { AuthProvider } from 'services/auth';
import { Grommet } from 'grommet';
import { ReactLocation, Router, Outlet } from 'react-location';
import { routes } from './routes';
import { theme } from './theme';

const location = new ReactLocation();

const App = () => {
    return (
        <AuthProvider>
           <Grommet full theme={theme}>
                <Router
                    routes={routes}
                    location={location}
                >
                    <Outlet />
                </Router>
            </Grommet>
        </AuthProvider>
    );
}

export default App;
