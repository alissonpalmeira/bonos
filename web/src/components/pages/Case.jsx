import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { NavBar } from 'components/organisms';
import { Outlet, useMatchRoute, useNavigate } from 'react-location';
import { slugify } from 'services/utils';

const Case = ({ paths }) => {
    const matchRoute = useMatchRoute();
    const navigate = useNavigate();

    useEffect(() => {
        if (!matchRoute({to: '/case/*'})) {
            navigate({ to: `/case/${slugify(paths[0][0])}` })
        }
    });

    return(
        <Box fill gap='medium' pad='small'>
            <NavBar paths={paths} />

            <Box fill align='center' justify='center' gap='large'>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Case;