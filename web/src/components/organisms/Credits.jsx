import React, { useRef } from 'react';
import { Box, Text } from 'grommet';
import { useMatch, useNavigate } from 'react-location';
import { TitleBar, Credit } from 'components/molecules';
import { useBonos } from 'services/business';

const Credits = () => {
    const { setCurrentCredit } = useBonos();
    const { data: { credits } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    const redeemCredit = (amount, issuer) => {
        setCurrentCredit(amount*100, issuer);
        navigate({ to: '../redeem' });
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
                            amount={value*100}
                            onEdit={() => redeemCredit(value, key)}
                            onShow={() => redeemCredit(value, key)}
                        />
                    ))}
                </Box>
            }
        </Box>
    )
}

export default Credits;