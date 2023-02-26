import React, { useRef } from 'react';
import { Box, Layer, Text } from 'grommet';
import { MatchRoute, Outlet, useMatch, useNavigate } from 'react-location';
import { TitleBar, Credit } from 'components/molecules';
import { useBonos } from 'services/business';

const Credits = () => {
    const { setCurrentCredit, resetCurrentCredit } = useBonos();
    const { data: { credits } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    // console.log(credits);

    const closeCredit = () => {
        resetCurrentCredit();
        navigate({ to: '.' });
    }

    const redeemCredit = (amount, issuer) => {
        setCurrentCredit(parseInt(amount)*100, issuer);
        navigate({ to: 'redeem' });
    }

    const renderCredit = () => {
        return (
            <Layer
                animation='fadeIn'
                full
                onClickOutside={closeCredit}
                onEsc={closeCredit}
                responsive={false}
                target={ref.current}
            >
                <Outlet />
            </Layer>
        )
    }

    return(
        <Box fill gap='medium' ref={ref}>
            <TitleBar
                title='My Credits'
            />

            { Object.keys(credits).length === 0 ?
                <Box align='center' fill gap='small' justify='center'>
                    <Text size='medium' textAlign='center'>No credits earned yet...</Text>
                    <Text size='medium' textAlign='center'>Try adding some wishes to your wishlist</Text>
                </Box>
            :
                <Box fill gap='xsmall' overflow={{vertical: 'auto'}}>
                    { Object.entries(credits).map(([key, value]) => (
                        <Credit 
                            key={key}
                            info={{ alias: key }}
                            amount={parseInt(value)*100}
                            onEdit={() => redeemCredit(value, key)}
                            onShow={() => redeemCredit(value, key)}
                        />
                    ))}
                </Box>
            }

            <MatchRoute to='redeem'>
                { renderCredit() }
            </MatchRoute>
        </Box>
    )
}

export default Credits;