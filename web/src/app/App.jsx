import React from 'react';
import { AuthProvider } from 'services/auth';
import { BonosProvider } from 'services/business';
import { Error } from 'components/pages';
import { Grommet } from 'grommet';
import { Pending } from 'components/molecules';
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
                    defaultErrorElement={<Error />}
                    defaultLoaderMaxAge={60000}
                    defaultPendingElement={<Pending />}
                    defaultPendingMs={1000}
                    defaultPendingMinMs={1000}
                >
                    <BonosProvider>
                        <Outlet />
                    </BonosProvider>
                </Router>
            </Grommet>
        </AuthProvider>
    );
}

export default App;
