import React, { useRef } from 'react';
import { AddCircle } from 'grommet-icons';
import { Box, Layer, Text } from 'grommet';
import { MatchRoute, Outlet, useMatch, useNavigate } from 'react-location';
import { TitleBar, Wish } from 'components/molecules';
import { useBonos } from 'services/business';

export const Wishlist = () => {
    const { setCurrentWish, resetCurrentWish } = useBonos();
    const { data: { wishlist } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    // console.log(wishlist);

    const closeWish = () => {
        resetCurrentWish();
        navigate({ to: '.' });
    }

    const editWish = (amount, issuer) => {
        setCurrentWish(parseInt(amount)*100, issuer);
        navigate({ to: 'edit' });
    }

    const renderWish = () => {
        return (
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
        )
    }

    return(
        <Box fill gap='small' ref={ref}>
            <TitleBar
                title='My Wishlist'
                icon={<AddCircle />}
                onClick={() => navigate({ to: 'add' })}
            />

            { Object.keys(wishlist).length === 0 ?
                <Box align='center' fill gap='small' justify='center'>
                    <Text size='medium' textAlign='center'>{'Tap the add button above to add wishes ;)'}</Text>
                </Box>
            :
                <Box fill gap='xsmall' overflow={{vertical: 'auto'}}>
                    { Object.entries(wishlist).map(([key, value]) => (
                        <Wish 
                            key={key}
                            info={{ alias: key }}
                            amount={parseInt(value)*100}
                            onEdit={() => editWish(value, key)}
                            onShow={() => editWish(value, key)}
                        />
                    ))}
                </Box>
            }

            <MatchRoute to='add'>
                { renderWish() }
            </MatchRoute>

            <MatchRoute to='edit'>
                { renderWish() }
            </MatchRoute>
        </Box>
    )
}
