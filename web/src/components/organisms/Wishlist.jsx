import React, { useRef } from 'react';
import { AddCircle } from 'grommet-icons';
import { Box, Text } from 'grommet';
import { useMatch, useNavigate } from 'react-location';
import { TitleBar, Wish } from 'components/molecules';
import { useBonos } from 'services/business';

const Wishlist = () => {
    const { setCurrentWish } = useBonos();
    const { data: { wishlist } } = useMatch();
    const navigate = useNavigate();
    const ref = useRef();
    
    const editWish = (amount, issuer) => {
        setCurrentWish(amount*100, issuer);
        navigate({ to: '../edit-wish' });
    }

    return(
        <Box fill gap='medium' ref={ref}>
            <TitleBar
                title='My Wishlist'
                icon={<AddCircle />}
                onClick={() => navigate({ to: '../add-wish' })}
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
                            amount={value*100}
                            onEdit={() => editWish(value, key)}
                            onShow={() => editWish(value, key)}
                        />
                    ))}
                </Box>
            }
        </Box>
    )
}

export default Wishlist;