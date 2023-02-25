import React, { useRef } from 'react';
import { AddCircle } from 'grommet-icons';
import { Box, Button, Layer, Text } from 'grommet';
import { MatchRoute, Outlet, useMatch, useNavigate } from 'react-location';
import { useBonos } from 'services/business';

export const Wishlist = () => {
    const { resetCurrentWish } = useBonos();
    const { data: { wishlist } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    console.log(wishlist);

    const closeWish = () => {
        resetCurrentWish();
        navigate({ to: '.' });
    }

    return(
        <Box fill gap='large' ref={ref}>
            <Box align='center' direction='row' fill='horizontal' flex={false} gap='medium' justify='between'>
                <Box fill='horizontal'>
                    <Text size='large' weight='bold'>My Wishlist</Text>
                </Box>

                <Button
                    icon={<AddCircle />}
                    onClick={() => navigate({ to: 'insert' })}
                    plain
                />
            </Box>

            <MatchRoute to='insert'>
                <Layer
                    animation='fadeIn'
                    full
                    onClickOutside={closeWish}
                    onEsc={closeWish}
                    responsive={false}
                    target={ref.current}
                >
                    <Outlet />
                </Layer>
            </MatchRoute>

        </Box>
    )
}
