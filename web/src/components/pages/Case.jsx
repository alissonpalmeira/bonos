import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { NavBar } from 'components/organisms';
import { Outlet, useMatchRoute, useNavigate } from 'react-location';
import { slugify } from 'services/utils';

export const Case = ({ paths }) => {
    const matchRoute = useMatchRoute();
    const navigate = useNavigate();

    useEffect(() => {
        if (!matchRoute({to: '/case/*'})) {
            navigate({ to: `/case/${slugify(paths[0])}` })
        }
    });

    return(
        <Box fill>
            <Box fill align='center' justify='center' gap='large'>
                <Outlet />
            </Box>

            <NavBar paths={paths} />
        </Box>
    )
}
