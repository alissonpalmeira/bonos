import React, { useRef } from 'react';
import { AddCircle } from 'grommet-icons';
import { Box, Text, Layer } from 'grommet';
import { MatchRoute, Outlet, useMatch, useNavigate } from 'react-location';
import { TitleBar } from 'components/molecules';
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
            <TitleBar
                title='My Wishlist'
                icon={<AddCircle />}
                onClick={() => navigate({ to: 'insert' })}
            />

            <Box align='center' fill gap='small' justify='center'>
                <Text size='medium' textAlign='center'>{'Tap the add button above to add wishes ;)'}</Text>
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
