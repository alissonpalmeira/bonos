import React, { useEffect, useRef, useState } from 'react';
import { Box, Layer } from 'grommet';
import { NavBar } from 'components/organisms';
import { Outlet, useMatchRoute, useNavigate } from 'react-location';
import { TestWarning } from 'components/organisms';
import { useBonos } from 'services/business';
import { slugify } from 'services/utils';

const Case = ({ paths }) => {
    const { showTestWarning } = useBonos();
    const [ showWarning, setShowWarning ] = useState(showTestWarning);
    const matchRoute = useMatchRoute();
    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if (!matchRoute({to: '/case/*'})) {
            navigate({ to: `/case/${slugify(paths[0])}` })
        }
    });

    return(
        <Box fill gap='medium' pad='small' ref={ref}>
            <NavBar paths={paths} />

            <Box fill align='center' justify='center' gap='large'>
                <Outlet />
            </Box>

            {showWarning && (
                <Layer
                    // full
                    modal
                    plain
                    responsive={false}
                    target={ref.current}
                >
                    <TestWarning onClose={() => setShowWarning(false)} />
                </Layer>            
            )}
        </Box>
    )
}

export default Case;